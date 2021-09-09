import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../Routes';
import { OnboardingDocuments } from './Documents';

export const Onboarding: React.FC = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    mt={5}
    px={2}
  >
    <Typography mb={3} textAlign="center">
      We need to authenticate your identity before we can issue you a private
      Nym ID
    </Typography>
    <Typography mb={3} fontWeight="bold" fontSize="larger">
      Either upload your Id
    </Typography>

    <OnboardingDocuments />

    <Box mt={4}>
      <Button
        variant="contained"
        color="success"
        to={routes.user.onboarding.onboardingUpload}
        component={Link}
        sx={{ py: 2 }}
      >
        Upload ID
        <KeyboardArrowRightIcon />
      </Button>
    </Box>

    <Typography mt={6} mb={3} fontWeight="bold" fontSize="larger">
      Or authenticate digitally
    </Typography>
    <Typography mb={3} textAlign="center">
      If you are a citizen of a country that can authenticate your identity
      digitally then
    </Typography>
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      mt={4}
      mb={4}
    >
      <Select value="ES">
        <MenuItem value="ES">Estonia</MenuItem>
        <MenuItem value="NL">Netherlands</MenuItem>
        <MenuItem value="DE">Germany</MenuItem>
        <MenuItem value="FR">France</MenuItem>
        <MenuItem value="UK">United Kingdom</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="success"
        disabled
        to={routes.user.home}
        component={Link}
        sx={{ ml: 1, py: 2 }}
      >
        Authenticate
        <KeyboardArrowRightIcon />
      </Button>
    </Grid>
  </Grid>
);
