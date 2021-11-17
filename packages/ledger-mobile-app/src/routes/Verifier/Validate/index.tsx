import * as React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import {
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BeenhereIcon from '@material-ui/icons/BeenhereOutlined';
import DirectionsCarFilledOutlinedIcon from '@material-ui/icons/DirectionsCarFilledOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import type { VerifierAccessControlPolicy } from 'coconut-wasm';
import { VerifierLayout as Layout } from '../../../layouts/DefaultLayout';
import { routes } from '../../../Routes';
import { ScanUserQrCode } from './ScanUserQrCode';
import { ValidateSuccess } from './Success';
import { useVerifierState } from '../../../state/verifier';
import { VerifierShowVerificationQRCode } from './ShowVerificationQRCode';
import { VerifierOptions } from './Options';

export const ValidateUrlPaths = {
  validate: '/verifier/validate',
  showQRCode: '/verifier/validate/show-qr-code',
  scanQRCode: '/verifier/validate/scan-qr-code',
  validateSuccess: '/verifier/validate/success',
  options: '/verifier/validate/options',
};

export const ValidateRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route exact path={ValidateUrlPaths.validate}>
        <Validate />
      </Route>
      <Route exact path={ValidateUrlPaths.options}>
        <VerifierOptions />
      </Route>
      <Route exact path={ValidateUrlPaths.showQRCode}>
        <VerifierShowVerificationQRCode />
      </Route>
      <Route exact path={ValidateUrlPaths.scanQRCode}>
        <ScanUserQrCode />
      </Route>
      <Route exact path={ValidateUrlPaths.validateSuccess}>
        <ValidateSuccess />
      </Route>
    </Switch>
  </Layout>
);

export const Validate: React.FC = () => {
  const history = useHistory();
  const state = useVerifierState();
  const setState = (policy: VerifierAccessControlPolicy) => {
    state.setVerifierPolicy(policy);
    history.push(routes.verifier.options);
  };
  return (
    <Grid mt={5} px={2}>
      <Button sx={{ mx: 0, p: 0 }} to={routes.verifier.home} component={Link}>
        <KeyboardArrowLeftIcon /> Back
      </Button>
      <Grid display="flex" direction="row" justifyContent="space-between">
        <h2>Choose a Policy</h2>
        <Button>
          Add
          <AddCircleOutlineIcon sx={{ ml: 1 }} />
        </Button>
      </Grid>
      <MenuList>
        <ListSubheader>COVID Certificates</ListSubheader>
        <MenuItem
          onClick={() =>
            setState({
              is_vaccinated: true,
              is_over_18: true,
              is_over_21: false,
            })
          }
        >
          <ListItemIcon>
            <BeenhereIcon />
          </ListItemIcon>
          <ListItemText>
            2x COVID vaccines
            <br />
            over 18 years old
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() =>
            setState({
              is_vaccinated: true,
              is_over_18: true,
              is_over_21: true,
            })
          }
        >
          <ListItemIcon>
            <BeenhereIcon />
          </ListItemIcon>
          <ListItemText>
            2x COVID vaccines
            <br />
            over 21 years old
          </ListItemText>
        </MenuItem>
        <ListSubheader sx={{ mt: 4 }}>COVID Test Results</ListSubheader>
        <MenuItem disabled>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText>Negative Test in last 3 days</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText>Negative Test in last 5 days</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText>Negative Test in last 7 days</ListItemText>
        </MenuItem>
        <ListSubheader sx={{ mt: 4 }}>Drivers License</ListSubheader>
        <MenuItem disabled>
          <ListItemIcon>
            <DirectionsCarFilledOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Over 18 years old</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <DirectionsCarFilledOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Over 21 years old</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <DirectionsCarFilledOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Over 25 years old</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <DirectionsCarFilledOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Over 65 years old</ListItemText>
        </MenuItem>
      </MenuList>
    </Grid>
  );
};
