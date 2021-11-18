/* tslint:disable */
/* eslint-disable */


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



/**
*/
export class App {
  free(): void;
/**
* @param {any[]} validator_urls
*/
  constructor(validator_urls: any[]);
/**
* @returns {Promise<any>}
*/
  get_validator_keys(): Promise<any>;
/**
* @param {any} value
* @returns {any}
*/
  set_covid_pass(value: any): any;
/**
* @returns {any}
*/
  get_covid_pass_cleartext(): any;
/**
* @returns {any}
*/
  get_covid_pass_hashed_base58(): any;
/**
* @returns {Promise<any>}
*/
  issue_coconut_credential(): Promise<any>;
/**
* Returns a Promise<String> containing the base58 encoded re-randomised coconut credential to show to the verifier
* @param {any} verifier_attributes
* @returns {Promise<any>}
*/
  show_coconut_credential(verifier_attributes: any): Promise<any>;
/**
* @param {any} access_control_policy
* @param {any} verifier_attributes
* @param {string} user_show_data_base58
* @returns {Promise<any>}
*/
  verify_coconut_credential(access_control_policy: any, verifier_attributes: any, user_show_data_base58: string): Promise<any>;
}
