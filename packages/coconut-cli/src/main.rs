use std::env;
use std::fs;

extern crate itertools;
use itertools::Itertools;

use clap::{load_yaml, value_t, App};
use coconut_interface::scheme::verification::{prove_covid_credential, verify_covid_credential};
use coconut_interface::{
    aggregate_signature_shares, blind_sign, elgamal_keygen, hash_to_scalar, prepare_blind_sign,
    ttp_keygen, Base58, CoconutError, Parameters, Signature, SignatureShare, VerificationKey,
};
use credentials::{
    blind_sign_partial_credential, create_aggregate_verification_key, get_verification_keys,
    obtain_aggregate_verification_key,
};
use log::{error, info};
use nymcoconut::scheme::verification::ThetaCovid;
use url::Url;

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

#[tokio::main]
async fn main() -> Result<(), CoconutError> {
    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "info");
    }
    pretty_env_logger::init();

    let params = Parameters::new(10)?;

    let validator_urls_raw = vec![
        "https://pcc-validator1.ci.nymte.ch/api".to_string(),
        "https://pcc-validator2.ci.nymte.ch/api".to_string(),
        "https://pcc-validator3.ci.nymte.ch/api".to_string(),
    ];
    let validator_urls =
        parse_url_validators(&validator_urls_raw).expect("Unable to parse validator urls");

    let verification_keys: Vec<VerificationKey> = get_verification_keys(&validator_urls)
        .await
        .expect("Unable to get coconut keys");

    let verification_key = create_aggregate_verification_key(&verification_keys)
        .expect("Unable to create aggregate coconut key");

    info!("validator_urls: {:?}", validator_urls_raw);

    // user's ElGamal keypair
    let elgamal_keypair = elgamal_keygen(&params);

    // attributes to consider
    let patient_id = hash_to_scalar(String::from("NHS678777").as_bytes());
    let full_name = hash_to_scalar(String::from("JaneDoe").as_bytes());
    let vaccine_medication_product_id = hash_to_scalar(String::from("EU/1/20/1528").as_bytes());
    let country_of_vaccination = hash_to_scalar(String::from("UK").as_bytes());
    let issuer = hash_to_scalar(String::from("NHS").as_bytes());
    let dob = hash_to_scalar(String::from("2021-11-05").as_bytes());

    let public_attributes = vec![
        patient_id,
        full_name,
        vaccine_medication_product_id,
        country_of_vaccination,
        issuer,
        dob,
    ];

    let user_secret = params.random_scalar();
    let private_attributes = vec![user_secret];

    // ISSUANCE PROTOCOL
    let blind_sign_request = prepare_blind_sign(
        &params,
        &elgamal_keypair,
        &private_attributes,
        &public_attributes,
    )?;

    // generate blinded signatures
    let mut blinded_signatures = Vec::new();

    let is_vaccinated = hash_to_scalar(String::from("TRUE").as_bytes());
    let is_over_18 = hash_to_scalar(String::from("TRUE").as_bytes());
    let is_over_21 = hash_to_scalar(String::from("TRUE").as_bytes());

    // These are the attributes on which the validator issues a signature
    let public_attributes = [
        patient_id,
        full_name,
        vaccine_medication_product_id,
        country_of_vaccination,
        issuer,
        dob,
        is_vaccinated,
        is_over_18,
        is_over_21,
    ];

    for validator_url in validator_urls.clone() {
        let blinded_signature = blind_sign_partial_credential(
            &validator_url,
            &elgamal_keypair,
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
                    &params,
                    &elgamal_keypair.private_key(),
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
    let signature =
        aggregate_signature_shares(&params, &verification_key, &attributes, &signature_shares)?;

    println!("\n==================================================================");
    println!("Issuance");
    println!("==================================================================");

    info!("Issuance, signature: {:?}", signature);

    // SHOW PROTOCOL
    let verifier_id = [11u8; 32];
    let timestamp = [12u8; 32];

    let show_private_attributes = vec![
        user_secret,
        patient_id,
        full_name,
        vaccine_medication_product_id,
        country_of_vaccination,
        issuer,
        dob,
    ];

    info!(
        "Show protocol, verifier id: {:?}, timestamp: {:?}",
        verifier_id, timestamp
    );

    // Prove covid credential
    let theta_covid = prove_covid_credential(
        &params,
        &verification_key,
        &signature,
        &show_private_attributes,
        &verifier_id,
        &timestamp,
    )?;

    println!("\n==================================================================");
    println!("Show");
    println!("==================================================================");

    info!("Show protocol, theta: {:?}", theta_covid);

    info!(
        "Show protocol, theta (bytes[{}]): {:?}",
        theta_covid.to_bytes().len(),
        theta_covid.to_bytes()
    );

    info!(
        "Show protocol, theta (bytes Base58): {:?}",
        bs58::encode(theta_covid.to_bytes()).into_string()
    );

    let theta_covid_re_randomised = prove_covid_credential(
        &params,
        &verification_key,
        &signature,
        &show_private_attributes,
        &verifier_id,
        &timestamp,
    )?;

    println!("\n==================================================================");
    println!("Show again, re-randomise");
    println!("==================================================================");
    info!(
        "QR code contents: theta (re-randomised) (bytes Base58): {:?}",
        bs58::encode(theta_covid_re_randomised.to_bytes()).into_string()
    );

    // Verify covid credentials
    let disclosed_attributes = vec![is_vaccinated, is_over_18, is_over_21];

    let result = verify_covid_credential(
        &params,
        &verification_key,
        &theta_covid,
        disclosed_attributes.as_ref(),
        &verifier_id,
        &timestamp,
    );

    println!("\n==================================================================");
    println!("Verify");
    println!(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    info!(
        "Result for theta [len = {}] is {}",
        theta_covid.to_bytes().len(),
        result
    );
    println!(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    let result_on_re_randomised = verify_covid_credential(
        &params,
        &verification_key,
        &theta_covid_re_randomised,
        disclosed_attributes.as_ref(),
        &verifier_id,
        &timestamp,
    );

    println!("\n");
    println!(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    info!(
        "Result for theta(re-randomised) [len = {}] is {}",
        theta_covid_re_randomised.to_bytes().len(),
        result_on_re_randomised
    );
    println!(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    println!("\n==================================================================");
    println!("Simulate reading from bytes of QR code");
    println!("==================================================================\n");

    let theta_covid_from_bytes = ThetaCovid::from_bytes(&theta_covid.to_bytes())?;

    let result_from_bytes = verify_covid_credential(
        &params,
        &verification_key,
        &theta_covid_from_bytes,
        disclosed_attributes.as_ref(),
        &verifier_id,
        &timestamp,
    );

    println!(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    info!(
        "Result for theta(from bytes) [len = {}] is {}",
        theta_covid_from_bytes.to_bytes().len(),
        result_from_bytes
    );
    println!(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    Ok(())
}
