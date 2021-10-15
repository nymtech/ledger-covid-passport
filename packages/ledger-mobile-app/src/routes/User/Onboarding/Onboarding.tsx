import * as React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Flag from 'react-flagkit';
import { routes } from '../../../Routes';
import { countries } from '../../../components/Onboarding/data';
import { useOnboardingState } from '../../../state';

export const Onboarding: React.FC = () => {
  const onboardingState = useOnboardingState();
  const history = useHistory();
  const [countryCode, setCountryCode] = React.useState('GB');
  const country = React.useMemo(
    () => countries[countryCode] || countries.UK,
    [countryCode],
  );
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <Typography
        mt={3}
        mb={3}
        fontWeight="bold"
        fontSize="larger"
        textAlign="center"
      >
        Get your COVID pass and add it to your wallet
      </Typography>
      <Typography mt={3} mb={3} textAlign="center">
        We need to authenticate your identity before we can issue you a Nym
        Private COVID Certificate
      </Typography>

      <Typography mb={3} textAlign="center">
        Choose the your country of residence and login to get your COVID
        vaccination certificate
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={4}
        mb={4}
      >
        <Select
          value={countryCode}
          onChange={(event) => setCountryCode(event.target.value)}
          sx={{ mb: 2, width: '100%' }}
        >
          {Object.values(countries).map((c) => (
            <MenuItem key={`country-${c.countryCode}`} value={c.countryCode}>
              <CountryAndFlag countryCode={c.countryCode}>
                {c.countryName}
              </CountryAndFlag>
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          sx={{ ml: 1, py: 2 }}
          onClick={() => {
            console.log({ countryCode });
            onboardingState.setByCountryCode(countryCode);
            history.push(routes.user.onboarding.onboardingAuthStart);
          }}
        >
          {country.healthAuthorityName} Login
          <KeyboardArrowRightIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

interface CountryAndFlagProps {
  countryCode: string;
}

const CountryAndFlag: React.FC<CountryAndFlagProps> = ({
  countryCode,
  children,
}) => (
  <Grid display="flex" direction="row" alignItems="center">
    <Box mr={1}>
      <Flag country={countryCode} />
    </Box>
    <div>{children}</div>
  </Grid>
);
