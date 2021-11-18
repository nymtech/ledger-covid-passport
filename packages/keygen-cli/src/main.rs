use clap::{load_yaml, value_t, App};
use coconut_interface::{ttp_keygen, Base58, Parameters};
use log::{debug, error, info};
use std::env;
use std::fs;

fn main() {
    if env::var("RUST_LOG").is_err() {
        env::set_var("RUST_LOG", "info");
    }
    pretty_env_logger::init();
    let yaml = load_yaml!("cli.yaml");
    let matches = App::from_yaml(yaml).get_matches();

    // Generate global parameters, these will have to be passed to everyone, I think
    // Assume two parameters for now, bandwitdh and version/epoch

    let run_id = uuid::Uuid::new_v4();

    info!("-- Starting run: {}", run_id);

    let n_parameters = value_t!(matches.value_of("N_PARAMETERS"), u32).unwrap();
    let parameters = Parameters::new(n_parameters).unwrap();

    let n_validators = value_t!(matches.value_of("N_VALIDATORS"), u32).unwrap();

    let threshold = if let Some(threshold) = matches.value_of("THRESHOLD") {
        match threshold.parse::<u16>() {
            Ok(x) => x,
            Err(_e) => {
                error!("Failed to covert {} to u16", threshold);
                std::process::exit(1)
            }
        }
    } else {
        (n_validators as f32 * 0.66 + 1.) as u16
    };

    info!("-- Generating keys");
    info!("---- Parameters: {}", n_parameters);
    info!("---- Validators: {}", n_validators);
    info!("---- Threshold: {}", threshold);

    let keypairs = ttp_keygen(&parameters, threshold as u64, n_validators as u64).unwrap();

    fs::create_dir_all(format!("keypairs/{}", run_id.to_string())).unwrap();

    for keypair in keypairs {
        debug!(
            "Writing {:?} to keypairs/{}",
            keypair.index,
            run_id.to_string()
        );
        fs::write(
            format!("keypairs/{}/{}", run_id.to_string(), keypair.index.unwrap()),
            keypair.to_bs58(),
        )
        .unwrap();
    }
}
