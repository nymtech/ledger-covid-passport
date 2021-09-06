import * as React from 'react';
import { Box, Chip, Grid } from '@material-ui/core';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import QRCode from 'react-qr-code';

export const ViewNymPassport: React.FC = () => (
  <Grid
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    mt={5}
    px={2}
  >
    <h2>Nym Passport</h2>
    <Box>
      <Chip
        icon={<BeenhereOutlinedIcon />}
        label="Authenticated"
        color="success"
        sx={{ p: 1 }}
      />
    </Box>
    <Box mt={1} fontSize="smaller">
      We have confirmed your identity and have issued you a Nym identity that
      you can use to protect your privacy by being in control of the personal
      information you disclose from other documents.
    </Box>
    <h4>Your Nym Identity</h4>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      width="100%"
    >
      <Box mt={2}>
        <QRCode value="a wonderful Nym identity key" />
      </Box>
    </Grid>
  </Grid>
);
