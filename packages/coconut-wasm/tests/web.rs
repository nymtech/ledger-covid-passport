//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use coconut_wasm::try_out_coconut;
use wasm_bindgen::__rt::assert_not_null;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    assert_eq!(1 + 1, 2);
}

#[wasm_bindgen_test]
fn test_cred() {
    let response = try_out_coconut();
    assert_not_null!(response.blinded_signature);
    assert_not_null!(response.signatures);
    assert_not_null!(response.randomised);
}
