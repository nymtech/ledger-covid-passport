import * as React from 'react';
import { Box, Button, FormControlLabel, Grid, Switch } from '@material-ui/core';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportGmailerrorredIcon from '@material-ui/icons/ReportGmailerrorred';
import { routes } from '../../../../Routes';

export const CovidPassConfirmVerifierCode: React.FC = () => (
  <Grid
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    mt={5}
    px={2}
  >
    <Button
      sx={{ mx: 0, p: 0 }}
      to={routes.user.app.view.covidPass.showPCC}
      component={Link}
    >
      <KeyboardArrowLeftIcon /> Back
    </Button>
    <h2>Disclose Information?</h2>
    <Box mt={2}>Please confirm the information you want to disclose:</Box>
    <Box mt={2}>
      <FormControlLabel
        control={<Switch checked />}
        label="Vaccination Status"
      />
    </Box>
    <Box mt={2}>
      <FormControlLabel control={<Switch />} label="Date of birth" />
    </Box>
    <Box mt={2}>
      <FormControlLabel control={<Switch />} label="Your full name" />
    </Box>
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
