use chrono::{DateTime, Datelike, Duration, Local, NaiveDate};
use std::cell::RefCell;
use std::rc::Rc;

use coconut_interface::scheme::verification::ThetaCovid;
use coconut_interface::{
    aggregate_signature_shares, elgamal_keygen, prepare_blind_sign, Base58, ElGamalKeyPair,
    Parameters, Signature, SignatureShare, VerificationKey,
};
use credentials::{
    blind_sign_partial_credential, create_aggregate_verification_key, get_verification_keys,
};
use js_sys::Promise;
use nymcoconut::scheme::verification::{prove_covid_credential, verify_covid_credential};
use url::Url;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::types::{
    CovidPassAttributes, PrivateAttributes, SignatureWithShares, ValidatorKeys,
    VerifierAccessControlPolicy, VerifierAttributes, ZKPayload,
};
use bls12_381::Scalar;

struct State {
    params: Parameters,
    user_elgamal_keypair: ElGamalKeyPair,
    public_attributes: Option<CovidPassAttributes>,
    private_attributes: PrivateAttributes,
    aggregated_verification_key: Option<VerificationKey>,
    verification_keys: Option<Vec<VerificationKey>>,
    validator_urls: Vec<Url>,
    coconut_credential: Option<Signature>,
    coconut_credential_shares: Option<Vec<SignatureShare>>,
}

impl State {
    fn init(validator_urls: Vec<Url>) -> State {
        let n_attributes = 10u32;
        let params = Parameters::new(n_attributes).unwrap();
        let user_elgamal_keypair = elgamal_keygen(&params);
        let user_secret = params.random_scalar();
        State {
            params,
            user_elgamal_keypair,
            public_attributes: None,
            private_attributes: PrivateAttributes { user_secret },
            aggregated_verification_key: None,
            verification_keys: None,
            validator_urls,
            coconut_credential: None,
            coconut_credential_shares: None,
        }
    }
}

#[wasm_bindgen]
pub struct App {
    state: Rc<RefCell<State>>,
}

fn parse_url_validators(raw: &Vec<String>) -> Result<Vec<Url>, String> {
    let mut parsed_urls = Vec::with_capacity(raw.len());
    for url in raw {
        let parsed_url: Url = url
            .parse()
            .map_err(|err| format!("one of validator urls is malformed - {}", err))?;
        parsed_urls.push(parsed_url)
    }
    Ok(parsed_urls)
}

#[wasm_bindgen]
impl App {
    #[wasm_bindgen(constructor, typescript_type = "string[]")]
    pub fn start(validator_urls: Vec<JsValue>) -> Self {
        // enable better JS error reporting on panic
        crate::utils::set_panic_hook();

        if validator_urls.len() < 1 {
            panic!("validator_urls must contain at least one value")
        }

        let parsed_urls = parse_url_validators(
            &validator_urls
                .iter()
                .map(|v| v.as_string().expect("Validator URL must be a string"))
                .collect(),
        )
        .unwrap_or(vec![]);

        Self {
            state: Rc::new(RefCell::new(State::init(parsed_urls))),
        }
    }

    #[wasm_bindgen(typescript_type = "Promise<ValidatorKeys>")]
    pub fn get_validator_keys(&mut self) -> Promise {
        let guard = self.state.clone();

        future_to_promise(async move {
            let mut state = guard.borrow_mut();

            let verification_keys: Vec<VerificationKey> =
                get_verification_keys(&state.validator_urls)
                    .await
                    .expect("Unable to get coconut keys");

            let verification_key = create_aggregate_verification_key(&verification_keys)
                .expect("Unable to create aggregate coconut key");

            state.aggregated_verification_key = Some(verification_key.clone());
            state.verification_keys = Some(verification_keys.clone());

            let val = ValidatorKeys {
                aggregate_key: verification_key.to_bs58(),
                keys: verification_keys.iter().map(|k| k.to_bs58()).collect(),
            };

            Ok(val.to_js_value())
        })
    }

    pub fn set_covid_pass(&mut self, value: &JsValue) -> Result<JsValue, JsValue> {
        let covid_pass = CovidPassAttributes::from_js_value(value)?;
        let mut state = self.state.borrow_mut();
        state.public_attributes = Some(covid_pass.clone());
        Ok(JsValue::from_bool(true))
    }

    #[wasm_bindgen(typescript_type = "CovidPassAttributes")]
    pub fn get_covid_pass_cleartext(&mut self) -> JsValue {
        let state = self.state.borrow();
        if state.public_attributes.is_none() {
            return JsValue::null();
        }
        state.public_attributes.as_ref().unwrap().to_js_value()
    }

    #[wasm_bindgen(typescript_type = "CovidPassAttributes")]
    pub fn get_covid_pass_hashed_base58(&mut self) -> JsValue {
        let state = self.state.borrow();
        if state.public_attributes.is_none() {
            return JsValue::null();
        }
        state
            .public_attributes
            .as_ref()
            .unwrap()
            .to_hashed_base58()
            .to_js_value()
    }

    #[wasm_bindgen(typescript_type = "Promise<SignatureWithShares>")]
    pub fn issue_coconut_credential(&mut self) -> Promise {
        let guard = self.state.clone();

        future_to_promise(async move {
            let mut state = guard.borrow_mut();

            if state.public_attributes.is_none() {
                return Err(JsValue::from_str("No COVID pass details set"));
            }

            if state.verification_keys.is_none() || state.aggregated_verification_key.is_none() {
                return Err(JsValue::from_str("No validator verification keys set"));
            }

            let verification_keys = state.verification_keys.as_ref().unwrap();
            let verification_key = state.aggregated_verification_key.as_ref().unwrap();

            let public_attributes_cleartext = state.public_attributes.as_ref().unwrap();
            let public_attributes = public_attributes_cleartext.to_hashed_scalars();
            let private_attributes = state.private_attributes.to_attr();

            // ISSUANCE PROTOCOL
            let blind_sign_request = prepare_blind_sign(
                &state.params,
                &state.user_elgamal_keypair,
                &private_attributes,
                &public_attributes,
            )
            .expect("Blind sign failed to prepare");

            // calculate access policy boolean attributes
            let date_of_birth = NaiveDate::parse_from_str(
                public_attributes_cleartext.dob_iso8601_date_only.as_str(),
                "%Y-%m-%d",
            )
            .expect("Unable to parse date of birth");
            let now = Local::now().date().naive_local();

            let access_policy_values = VerifierAccessControlPolicy {
                is_vaccinated: true,
                is_over_18: NaiveDate::from_ymd(now.year() - 18, now.month(), now.day())
                    >= date_of_birth,
                is_over_21: NaiveDate::from_ymd(now.year() - 21, now.month(), now.day())
                    >= date_of_birth,
            };
            let access_policy_attributes = access_policy_values.to_attr();

            // append access control policy attributes to be blind signed by each validator
            let public_attributes: Vec<Scalar> =
                [&public_attributes[..], &access_policy_attributes[..]].concat();

            // generate blinded signatures
            let mut blinded_signatures = Vec::new();
            for validator_url in state.validator_urls.clone() {
                let blinded_signature = blind_sign_partial_credential(
                    &validator_url,
                    &state.user_elgamal_keypair,
                    &blind_sign_request,
                    &public_attributes,
                    (private_attributes.len() + public_attributes.len()) as u32,
                )
                .await
                .expect(
                    format!(
                        "Unable to blind sign partial credential on {}",
                        validator_url,
                    )
                    .as_str(),
                );
                blinded_signatures.push(blinded_signature);
            }

            let unblinded_signatures: Vec<Signature> = blinded_signatures
                .into_iter()
                .zip(verification_keys.iter())
                .map(|(signature, verification_key)| {
                    signature
                        .unblind(
                            &state.params,
                            &state.user_elgamal_keypair.private_key(),
                            &verification_key,
                            &private_attributes,
                            &public_attributes,
                            &blind_sign_request.get_commitment_hash(),
                        )
                        .unwrap()
                })
                .collect();

            let signature_shares: Vec<SignatureShare> = unblinded_signatures
                .iter()
                .enumerate()
                .map(|(idx, signature)| SignatureShare::new(*signature, (idx + 1) as u64))
                .collect();

            let mut attributes = Vec::with_capacity(1 + 9);
            attributes.extend_from_slice(&private_attributes);
            attributes.extend_from_slice(&public_attributes);

            // Randomize credentials and generate any cryptographic material to verify them
            let signature = aggregate_signature_shares(
                &state.params,
                &verification_key,
                &attributes,
                &signature_shares,
            )
            .expect("Unable to aggregate signature shares while issue coconut credential");

            // serialise to Base58 and create a return value JS object
            let js_return_value =
                SignatureWithShares::new(&signature_shares, &signature).to_js_value();

            state.coconut_credential_shares = Some(signature_shares);
            state.coconut_credential = Some(signature);

            Ok(js_return_value)
        })
    }

    /// Returns a Promise<String> containing the base58 encoded re-randomised coconut credential to show to the verifier
    #[wasm_bindgen(typescript_type = "Promise<string>")]
    pub fn show_coconut_credential(&mut self, verifier_attributes: &JsValue) -> Promise {
        let verifier_attributes_deserialised =
            VerifierAttributes::from_js_value(&verifier_attributes)
                .expect("Verifier details are invalid");

        // SHA256 the verifier attributes
        let verifier_attributes_scalars = verifier_attributes_deserialised.to_hashes();

        let guard = self.state.clone();

        future_to_promise(async move {
            let state = guard.borrow();

            if state.public_attributes.is_none() {
                return Err(JsValue::from_str("No COVID pass details set"));
            }

            if state.aggregated_verification_key.is_none() {
                return Err(JsValue::from_str("No validator verification keys set"));
            }

            if state.coconut_credential.is_none() {
                return Err(JsValue::from_str("No COVID coconut credential issued"));
            }

            let verification_key = state.aggregated_verification_key.as_ref().unwrap();
            let public_attributes = state
                .public_attributes
                .as_ref()
                .unwrap()
                .to_hashed_scalars();
            let private_attributes = state.private_attributes.to_attr();

            let signature = state.coconut_credential.as_ref().unwrap();

            let show_private_attributes: Vec<Scalar> =
                [&private_attributes[..], &public_attributes[..]].concat();

            // Prove covid credential
            let theta_covid = prove_covid_credential(
                &state.params,
                &verification_key,
                &signature,
                &show_private_attributes,
                &verifier_attributes_scalars.verifier_id,
                &verifier_attributes_scalars.timestamp,
            )
            .expect("Unable to prove credential");

            let theta_covid_base58 = bs58::encode(theta_covid.to_bytes()).into_string();

            Ok(JsValue::from_str(theta_covid_base58.as_str()))
        })
    }

    #[wasm_bindgen(typescript_type = "Promise<ZKPayload>")]
    pub fn verify_coconut_credential(
        &mut self,
        access_control_policy: &JsValue,
        verifier_attributes: &JsValue,
        user_show_data_base58: &str,
    ) -> Promise {
        let verifier_attributes_deserialised =
            VerifierAttributes::from_js_value(&verifier_attributes)
                .expect("Verifier attributes are invalid");
        let access_control_policy_deserialised =
            VerifierAccessControlPolicy::from_js_value(&access_control_policy)
                .expect("Access control policy is invalid");

        let guard = self.state.clone();

        // SHA256 the verifier attributes
        let verifier_attributes_scalars = verifier_attributes_deserialised.to_hashes();

        // SHA256 the access control policy
        let disclosed_attributes = access_control_policy_deserialised.to_attr();

        let user_show_data_base58_str = user_show_data_base58.to_string();

        future_to_promise(async move {
            let state = guard.borrow();

            if state.aggregated_verification_key.is_none() {
                return Err(JsValue::from_str("No validator verification keys set"));
            }

            let verification_key = state.aggregated_verification_key.as_ref().unwrap();

            // convert user show data back into theta
            let user_show_data = bs58::decode(user_show_data_base58_str.as_bytes())
                .into_vec()
                .expect("Unable to decode user show data from Base58");
            let theta_covid = ThetaCovid::from_bytes(user_show_data.as_slice())
                .expect("Unable to parse user show data");

            let result = verify_covid_credential(
                &state.params,
                &verification_key,
                &theta_covid,
                disclosed_attributes.as_ref(),
                &verifier_attributes_scalars.verifier_id,
                &verifier_attributes_scalars.timestamp,
            );

            let zk_payload = ZKPayload::from_theta_covid(theta_covid, result);

            Ok(zk_payload.to_js_value())
        })
    }
}
