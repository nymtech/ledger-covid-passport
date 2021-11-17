extern crate itertools;

use bls12_381::Scalar;
use coconut_interface::scheme::verification::ThetaCovid;
use coconut_interface::traits::Bytable;
use coconut_interface::{hash_to_scalar, Base58, Signature};
use nymcoconut::SignatureShare;
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "pkg/types/CovidPassAttributes.ts")]
pub struct CovidPassAttributes {
    pub patient_id: String,
    pub full_name: String,
    pub vaccine_medication_product_id: String,
    pub country_of_vaccination: String,
    pub issuer: String,
    pub dob_iso8601_date_only: String,
}

impl CovidPassAttributes {
    pub fn from_js_value(value: &JsValue) -> Result<CovidPassAttributes, JsValue> {
        if !value.is_object() {
            return Err(JsValue::from_str("Value is not an object"));
        }
        let v: CovidPassAttributes = value.into_serde().unwrap();
        Ok(v)
    }

    pub fn to_js_value(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }

    /// Returns a vector of hashed values
    pub fn to_hashed_scalars(&self) -> Vec<Scalar> {
        vec![
            hash_to_scalar(self.patient_id.as_bytes()),
            hash_to_scalar(self.full_name.as_bytes()),
            hash_to_scalar(self.vaccine_medication_product_id.as_bytes()),
            hash_to_scalar(self.country_of_vaccination.as_bytes()),
            hash_to_scalar(self.issuer.as_bytes()),
            hash_to_scalar(self.dob_iso8601_date_only.as_bytes()),
        ]
    }

    /// Returns a new struct with all values SHA256 hashed and Base58 encoded
    pub fn to_hashed_base58(&self) -> CovidPassAttributes {
        CovidPassAttributes {
            patient_id: attr_to_base58(&self.patient_id),
            full_name: attr_to_base58(&self.full_name),
            vaccine_medication_product_id: attr_to_base58(&self.vaccine_medication_product_id),
            country_of_vaccination: attr_to_base58(&self.country_of_vaccination),
            issuer: attr_to_base58(&self.issuer),
            dob_iso8601_date_only: attr_to_base58(&self.dob_iso8601_date_only),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "pkg/types/CovidPassWithBoolAttributes.ts")]
pub struct CovidPassWithBoolAttributes {
    pub patient_id: String,
    pub full_name: String,
    pub vaccine_medication_product_id: String,
    pub country_of_vaccination: String,
    pub issuer: String,
    pub dob_iso8601_date_only: String,
    pub is_vaccinated: bool,
    pub is_over_18: bool,
    pub is_over_21: bool,
}

impl CovidPassWithBoolAttributes {
    pub fn from_js_value(value: &JsValue) -> Result<CovidPassWithBoolAttributes, JsValue> {
        if !value.is_object() {
            return Err(JsValue::from_str("Value is not an object"));
        }
        let v: CovidPassWithBoolAttributes = value.into_serde().unwrap();
        Ok(v)
    }

    pub fn to_js_value(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }

    /// Returns a vector of hashed values
    pub fn to_hashed_scalars(&self) -> Vec<Scalar> {
        vec![
            hash_to_scalar(self.patient_id.as_bytes()),
            hash_to_scalar(self.full_name.as_bytes()),
            hash_to_scalar(self.vaccine_medication_product_id.as_bytes()),
            hash_to_scalar(self.country_of_vaccination.as_bytes()),
            hash_to_scalar(self.issuer.as_bytes()),
            hash_to_scalar(self.dob_iso8601_date_only.as_bytes()),
            hash_to_scalar(self.is_vaccinated.to_string().as_bytes()),
            hash_to_scalar(self.is_over_18.to_string().as_bytes()),
            hash_to_scalar(self.is_over_21.to_string().as_bytes()),
        ]
    }

    /// Returns a new struct with all values SHA256 hashed and Base58 encoded
    pub fn to_hashed_base58(&self) -> CovidPassWithBoolAttributes {
        CovidPassWithBoolAttributes {
            patient_id: attr_to_base58(&self.patient_id),
            full_name: attr_to_base58(&self.full_name),
            vaccine_medication_product_id: attr_to_base58(&self.vaccine_medication_product_id),
            country_of_vaccination: attr_to_base58(&self.country_of_vaccination),
            issuer: attr_to_base58(&self.issuer),
            dob_iso8601_date_only: attr_to_base58(&self.dob_iso8601_date_only),
            is_vaccinated: self.is_vaccinated,
            is_over_18: self.is_over_18,
            is_over_21: self.is_over_21,
        }
    }
}

pub struct PrivateAttributes {
    pub user_secret: Scalar,
}

impl PrivateAttributes {
    pub fn to_attr(&self) -> Vec<Scalar> {
        vec![self.user_secret]
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "pkg/types/SignatureWithShares.ts")]
pub struct SignatureWithShares {
    pub signature_shares: Vec<String>,
    pub signature: String,
}

impl SignatureWithShares {
    pub fn new(signature_shares: &[SignatureShare], signature: &Signature) -> Self {
        SignatureWithShares {
            signature_shares: signature_shares
                .into_iter()
                .map(|s| bs58::encode(s.signature().to_byte_vec()).into_string())
                .collect(),
            signature: signature.to_bs58(),
        }
    }
    pub fn to_js_value(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "pkg/types/ZKPayload.ts")]
pub struct ZKPayload {
    // blinded_message (kappa)
    pub blinded_message: String,
    // sigma
    pub credential: String,
    // pi_v
    pub pi_v: String,
    // result of verification
    pub result: bool,
}

impl ZKPayload {
    pub fn from_js_value(value: &JsValue) -> Result<ZKPayload, JsValue> {
        if !value.is_object() {
            return Err(JsValue::from_str("Value is not an object"));
        }
        let v: ZKPayload = value.into_serde().unwrap();
        Ok(v)
    }

    pub fn to_js_value(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }

    pub fn from_theta_covid(theta: ThetaCovid, result: bool) -> ZKPayload {
        let (blinded_message_bytes, credential_bytes, pi_v_bytes) = theta.to_bytes_tuple();

        ZKPayload {
            blinded_message: bs58::encode(blinded_message_bytes).into_string(),
            credential: bs58::encode(credential_bytes).into_string(),
            pi_v: bs58::encode(pi_v_bytes).into_string(),
            result,
        }
    }
}

/// SHA256 hashes a string value and Base58 encodes the hash as a string
fn attr_to_base58(value: &String) -> String {
    let attr = hash_to_scalar(value.as_bytes());
    bs58::encode(attr.to_byte_vec()).into_string()
}

/// The verifier can request certain attributes to be proved
#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "pkg/types/VerifierAccessControlPolicy.ts")]
pub struct VerifierAccessControlPolicy {
    pub is_vaccinated: bool,
    pub is_over_18: bool,
    pub is_over_21: bool,
}

impl VerifierAccessControlPolicy {
    pub fn from_js_value(value: &JsValue) -> Result<VerifierAccessControlPolicy, JsValue> {
        if !value.is_object() {
            return Err(JsValue::from_str("Value is not an object"));
        }
        let v: VerifierAccessControlPolicy = value.into_serde().unwrap();
        Ok(v)
    }

    pub fn to_js_value(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }

    pub fn to_attr(&self) -> Vec<Scalar> {
        vec![
            hash_to_scalar(self.is_vaccinated.to_string().as_bytes()),
            hash_to_scalar(self.is_over_18.to_string().as_bytes()),
            hash_to_scalar(self.is_over_21.to_string().as_bytes()),
        ]
    }
}

/// Verifier attributes
#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "pkg/types/VerifierAttributes.ts")]
pub struct VerifierAttributes {
    pub timestamp: String,
    pub verifier_id: String,
}

/// Internal representation of verifier attributes (SHA256 hashes of string values)
pub struct VerifierAttributeHashes {
    pub timestamp: [u8; 32],
    pub verifier_id: [u8; 32],
}

impl VerifierAttributes {
    pub fn from_js_value(value: &JsValue) -> Result<VerifierAttributes, JsValue> {
        if !value.is_object() {
            return Err(JsValue::from_str("Value is not an object"));
        }
        let v: VerifierAttributes = value.into_serde().unwrap();
        Ok(v)
    }

    pub fn to_js_value(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }

    /// Converts string values to hashes and returns as fixed length byte arrays
    pub fn to_hashes(&self) -> VerifierAttributeHashes {
        VerifierAttributeHashes {
            timestamp: hash_to_scalar(self.timestamp.as_bytes()).to_bytes(),
            verifier_id: hash_to_scalar(self.verifier_id.as_bytes()).to_bytes(),
        }
    }

    /// Returns a new struct with all values SHA256 hashed and Base58 encoded
    pub fn to_hashed_base58(&self) -> VerifierAttributes {
        VerifierAttributes {
            verifier_id: attr_to_base58(&self.verifier_id),
            timestamp: attr_to_base58(&self.timestamp),
        }
    }
}

impl VerifierAttributeHashes {
    /// Returns a new struct with all values SHA256 hashed and Base58 encoded
    pub fn to_base58(&self) -> VerifierAttributes {
        VerifierAttributes {
            verifier_id: bs58::encode(&self.verifier_id).into_string(),
            timestamp: bs58::encode(&self.timestamp).into_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export, export_to = "pkg/types/ValidatorKeys.ts")]
pub struct ValidatorKeys {
    pub keys: Vec<String>,
    pub aggregate_key: String,
}

impl ValidatorKeys {
    pub fn to_js_value(&self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }
}
