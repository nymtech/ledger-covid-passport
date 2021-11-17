use wasm_bindgen::prelude::*;

mod app;
mod types;
mod utils;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[allow(dead_code, unused_macros)]
macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen(typescript_custom_section)]
const TS_APPEND_CONTENT: &'static str = r#"

// export types generated with `ts-rs` - run `cargo test` to regenerate and adjust imports below in `lib.rs`

export * from './types/CovidPassAttributes';
export * from './types/CovidPassWithBoolAttributes';
export * from './types/SignatureWithShares';
export * from './types/VerifierAccessControlPolicy';
export * from './types/VerifierAttributes';
export * from './types/ZKPayload';
export * from './types/ValidatorKeys';

// override wasm-bind generated method signatures (urrrgh)

import { CovidPassAttributes } from './types/CovidPassAttributes';
import { SignatureWithShares } from './types/SignatureWithShares';
import { VerifierAccessControlPolicy } from './types/VerifierAccessControlPolicy';
import { VerifierAttributes } from './types/VerifierAttributes';
import { ZKPayload } from './types/ZKPayload';
import { ValidatorKeys } from './types/ValidatorKeys';

class App {
  constructor(validator_urls: string[]);
  get_validator_keys(): Promise<ValidatorKeys>;
  set_covid_pass(value: CovidPassAttributes): CovidPassAttributes;
  get_covid_pass_cleartext(): CovidPassAttributes;
  get_covid_pass_hashed_base58(): CovidPassAttributes;
  issue_coconut_credential(): Promise<SignatureWithShares>;
  show_coconut_credential(verifier_attributes: VerifierAttributes): Promise<string>;
  verify_coconut_credential(access_control_policy: VerifierAccessControlPolicy, verifier_attributes: VerifierAttributes, user_show_data_base58: string): Promise<ZKPayload>;
}

"#;
