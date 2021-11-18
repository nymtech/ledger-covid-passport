import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
  App,
  CovidPassAttributes,
  SignatureWithShares,
  ValidatorKeys,
  VerifierAccessControlPolicy,
  VerifierAttributes,
  ZKPayload,
} from 'coconut-wasm';
import QRCode from 'react-qr-code';
import img from './coconut.png';

interface State {
  pccClearText?: CovidPassAttributes;
  pccHashed?: CovidPassAttributes;
  validatorKeys?: ValidatorKeys;
  signatureWithShares?: SignatureWithShares;
  userShowDataBase58?: string;
  verifyResult?: ZKPayload;
  policy?: VerifierAccessControlPolicy;
  verifierAttributes: VerifierAttributes;
}

const getDefaultDateOfBirth = () => {
  const now = new Date();
  const dob = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  return dob.toISOString().slice(0, 10);
};

export const ReactApp: React.FC = () => {
  const app = React.useRef(
    new App([
      // 'http://localhost:8080',
      'https://pcc-validator1.ci.nymte.ch/api',
      'https://pcc-validator2.ci.nymte.ch/api',
      'https://pcc-validator3.ci.nymte.ch/api',
    ]),
  );

  const [state, setState] = React.useState<State>({
    verifierAttributes: {
      verifier_id: '1234',
      timestamp: new Date().toISOString(),
    },
  });

  React.useEffect(() => {
    (async () => {
      const validatorKeys = await app.current.get_validator_keys();
      setState((prevState) => ({ ...prevState, validatorKeys }));
    })();
    return () => {
      if (app.current) {
        app.current.free();
      }
    };
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: CovidPassAttributes) => {
    app.current.set_covid_pass(data);
    const signatureWithShares = await app.current.issue_coconut_credential();
    setState((prevState) => ({
      verifierAttributes: prevState.verifierAttributes,
      validatorKeys: prevState.validatorKeys,
      signatureWithShares,
    }));
  };

  const handleShow = async () => {
    const userShowDataBase58 = await app.current.show_coconut_credential(
      state.verifierAttributes,
    );

    setState((prevState) => ({
      ...prevState,
      userShowDataBase58,
      verifyResult: undefined,
    }));
  };

  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const onVerify = async (data: any) => {
    const policy: VerifierAccessControlPolicy = {
      is_vaccinated: Boolean(data.is_vaccinated),
      is_over_18: Boolean(data.is_over_18),
      is_over_21: Boolean(data.is_over_21),
    };

    setState((prevState) => ({ ...prevState, policy }));

    const verifyResult: ZKPayload = await app.current.verify_coconut_credential(
      policy,
      state.verifierAttributes,
      state.userShowDataBase58,
    );

    setState((prevState) => ({ ...prevState, verifyResult }));
  };

  return (
    <div className="container-fluid mt-4">
      <h1 className="mb-5 d-flex align-items-center">
        <div className="pe-3">
          <img src={img} height="50" />
        </div>
        <div>Coconut WASM</div>
      </h1>

      <div className="row mt-5">
        <div className="col-6">
          {!state.validatorKeys ? (
            <>Loading verifier keys...</>
          ) : (
            <>
              <h3>Issuance</h3>
              <form
                id="issuance_form"
                className="mt-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3">
                  <label className="form-label">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('full_name')}
                    defaultValue="Joe Bloggs"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Country of Vaccination</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('country_of_vaccination')}
                    defaultValue="GB"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Credential issuer</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('issuer')}
                    defaultValue="GB"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Date of Birth (YYYY-MM-DD)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('dob_iso8601_date_only')}
                    defaultValue={getDefaultDateOfBirth()}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Vaccine Medication Product ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('vaccine_medication_product_id')}
                    defaultValue="EU/1/20/1528"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Patient Id</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register('patient_id')}
                    defaultValue="NHS678777"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Issue
                </button>
              </form>
            </>
          )}
        </div>
        <div className="col-6">
          {state.signatureWithShares && (
            <>
              <h3>Show</h3>
              <button
                type="submit"
                className="mt-3 btn btn-danger"
                onClick={handleShow}
              >
                Show credential
              </button>
              <div className="mt-3 mb-3">
                {state.userShowDataBase58 && (
                  <QRCode value={state.userShowDataBase58} />
                )}
              </div>
            </>
          )}
          {state.userShowDataBase58 && (
            <>
              <h3>Verification</h3>
              <form className="mt-4" onSubmit={handleSubmit2(onVerify)}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    {...register2('is_vaccinated')}
                  />
                  <label className="form-check-label">Is vaccinated?</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    {...register2('is_over_18')}
                  />
                  <label className="form-check-label">Is over 18?</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register2('is_over_21')}
                  />
                  <label className="form-check-label">Is over 21?</label>
                </div>
                <button type="submit" className="mt-3 btn btn-success">
                  Verify
                </button>
              </form>
            </>
          )}

          {state.verifyResult && (
            <div className="mt-3">
              {state.verifyResult?.result === true && (
                <span className="badge rounded-pill bg-success">
                  Verification successful
                </span>
              )}
              {state.verifyResult?.result === false && (
                <span className="badge rounded-pill bg-danger">
                  Verification failed
                </span>
              )}
              {state.verifyResult?.result === undefined && (
                <span className="badge rounded-pill bg-light text-dark">
                  Not verified yet, please show credential...
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 mb-3">
        <h4>State</h4>
        <pre>{JSON.stringify({ state }, null, 2)}</pre>
      </div>
    </div>
  );
};
