import * as React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import 'react-html5-camera-photo/build/css/index.css';
import { useHistory } from 'react-router-dom';
import type { CovidPassAttributes } from 'coconut-wasm';
import { routes } from '../../../Routes';
import { useCoconutState } from '../../../state';
import { getFakeHCert } from '../../../components/StateProvider/fakeData';

const getDefaultDateOfBirth = () => {
  const now = new Date();
  const dob = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
  return dob.toISOString().slice(0, 10);
};

const getFakeCovidCert = (): CovidPassAttributes => {
  const hcert = getFakeHCert();
  return {
    full_name: `${hcert.hcert.iss.nam.fn}, ${hcert.hcert.iss.nam.gn}`,
    vaccine_medication_product_id: hcert.hcert.iss.v[0].mp,
    country_of_vaccination: hcert.hcert.iss.v[0].co,
    dob_iso8601_date_only: getDefaultDateOfBirth(),
    issuer: hcert.hcert.iss.v[0].is,
    patient_id: hcert.hcert.iss.v[0].ci,
  };
};

export const AuthWait: React.FC = () => {
  const state = useCoconutState();
  const [progress, setProgress] = React.useState('Please wait...');
  const history = useHistory();
  React.useEffect(() => {
    setTimeout(() => {
      setProgress('Checking details...');
    }, 1500);
    setTimeout(() => {
      setProgress('Getting COVID vaccination certificate...');
      (async () => {
        state.app.set_covid_pass(getFakeCovidCert());
        state.setPccHashed(state.app.get_covid_pass_hashed_base58());
        state.setPccClearText(state.app.get_covid_pass_cleartext());
        const signature = await state.app.issue_coconut_credential();
        state.setSignatureWithShares(signature);
      })();
    }, 3000);
    setTimeout(() => {
      setProgress('Done!');
    }, 5000);
    setTimeout(() => {
      history.push(routes.user.onboarding.onboardingAuthDone);
    }, 6000);
  }, []);
  return (
    <Grid
      height="100%"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <CircularProgress />
      <Typography mt={2} textAlign="center">
        {progress}
      </Typography>
    </Grid>
  );
};
