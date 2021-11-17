# Coconut WASM

WASM + Coconut = ♥️

## Building

```
wasm-pack build
```

Typescript typings are built with https://github.com/Aleph-Alpha/ts-rs by running:

```
cargo test
```

## Running

```
cd www
npm install
npm run start
```

## Running the Validator API

Generate a keypair using `coconut/keygen-cli`.

Then run API:

```
cargo run --release --features=coconut -- --keypair ../../coconut/keygen-cli/keypairs/5967d33f-c2fc-44a5-b69f-ae6147d5451d/1 --coconut-only
```
