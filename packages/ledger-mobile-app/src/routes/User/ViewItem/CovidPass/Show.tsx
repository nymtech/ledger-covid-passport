import * as React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { routes } from '../../../../Routes';
import { HealthCertificate } from '../../../../components/HealthCertificate';
import { useAppState } from '../../../../components/StateProvider';
import { HCertValidity } from '../../../../components/HealthCertificate/HCertValidity';

export const CovidPassShow: React.FC = () => {
  const state = useAppState();
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
      <Box my={2}>
        <HCertValidity wrapper={state.hcert} />
      </Box>
      {state.hcert && <HealthCertificate wrapper={state.hcert} />}
    </Grid>
  );
};
