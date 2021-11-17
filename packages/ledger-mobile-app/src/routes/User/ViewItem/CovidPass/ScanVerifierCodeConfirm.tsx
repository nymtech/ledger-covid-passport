import * as React from 'react';
import { Alert, AlertTitle, Box, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ReportGmailerrorredIcon from '@material-ui/icons/ReportGmailerrorred';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { routes } from '../../../../Routes';
import { useCoconutState } from '../../../../state';

export const CovidPassConfirmVerifierCode: React.FC = () => {
  const state = useCoconutState();

  if (!state.verifierPolicy || !state.verifierAttributes) {
    return (
      <Grid
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={5}
        px={2}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <p>You do not seem to have scanned a valid verifier code.</p>
          <p>Please try scan the verifier code again.</p>
        </Alert>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={6}
          width="100%"
        >
          <Button
            variant="contained"
            to={routes.user.app.view.covidPass.scanVerifierCode}
            component={Link}
            sx={{ mx: 1, py: 2 }}
          >
            <KeyboardArrowLeftIcon /> Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <Button
        sx={{ mx: 0, p: 0 }}
        to={routes.user.app.view.covidPass.home}
        component={Link}
      >
        <KeyboardArrowLeftIcon /> Back
      </Button>
      <h2>Disclose Information?</h2>
      <Box mt={2}>
        Please confirm that you consent to disclosing the following information:
      </Box>
      <Box mt={2} display="flex" alignItems="center">
        <CheckBoxIcon sx={{ mr: 1 }} /> Vaccination Status
      </Box>
      {state.verifierPolicy.is_over_18 && !state.verifierPolicy.is_over_21 && (
        <Box mt={2} display="flex" alignItems="center">
          <CheckBoxIcon sx={{ mr: 1 }} /> Over 18 years old
        </Box>
      )}
      {state.verifierPolicy.is_over_21 && (
        <Box mt={2} display="flex" alignItems="center">
          <CheckBoxIcon sx={{ mr: 1 }} /> Over 21 years old
        </Box>
      )}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={6}
        width="100%"
      >
        <Button
          variant="contained"
          color="error"
          to={routes.user.app.view.covidPass.home}
          component={Link}
          sx={{ mx: 1, py: 2 }}
        >
          <KeyboardArrowLeftIcon sx={{ mr: 1 }} />
          No
          <ReportGmailerrorredIcon sx={{ ml: 2 }} />
        </Button>
        <Button
          variant="contained"
          color="success"
          to={routes.user.app.view.covidPass.showPCC}
          component={Link}
          sx={{ mx: 1, py: 2 }}
        >
          <CheckCircleOutlineIcon sx={{ mr: 2 }} />
          Yes <KeyboardArrowRightIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
