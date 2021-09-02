import * as React from 'react';
import { Box, Button, FormControlLabel, Grid, Switch } from '@material-ui/core';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../../Routes';

export const CovidPassCreateCustom: React.FC = () => (
  <Grid
    direction="column"
    justifyContent="center"
    alignItems="center"
    mt={5}
    px={2}
  >
    <h2>Create Custom Private COVID Certificate</h2>
    <Box>Choose the information you want to disclose:</Box>
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
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={2}
      width="100%"
    >
      <Box mt={4}>
        <Button
          color="success"
          variant="contained"
          to={routes.user.app.view.covidPass.showPCC}
          component={Link}
        >
          Create private certificate <KeyboardArrowRightIcon />
        </Button>
      </Box>
    </Grid>
  </Grid>
);
