## Generate Coconut key pairs

```
cargo run -- <NUMBER OF KEYPAIRS> <NUMBER OF PARAMETERS> <THRESHOLD>
```

Key pairs will be generated in the `keypairs` directory under the run UUID.

For 3 validators, with 10 parameters and threshold of 2:

```
cargo run -- 3 10 2
```
