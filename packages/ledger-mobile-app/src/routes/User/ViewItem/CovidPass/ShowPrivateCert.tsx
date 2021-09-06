import * as React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import QRCode from 'react-qr-code';
import { routes } from '../../../../Routes';

const randomValue = () =>
  [1, 2, 3, 4, 5, 6, 7, 8].map(() => `${Math.random()}`).join('\n');

export const CovidPassShowPrivate: React.FC = () => {
  const [value, setValue] = React.useState(randomValue());
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
      <h2>Your Private COVID Pass</h2>
      <Box my={5}>
        <QRCode value={value} />
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => setValue(randomValue())}
      >
        Re-randomize
      </Button>
    </Grid>
  );
};
