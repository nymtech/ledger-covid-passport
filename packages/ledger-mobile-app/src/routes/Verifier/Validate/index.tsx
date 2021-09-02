import * as React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import {
  Box,
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
import { VerifierLayout as Layout } from '../../../layouts/DefaultLayout';
import { routes } from '../../../Routes';
import { ScanUserQrCode } from './ScanUserQrCode';
import { ValidateSuccess } from './Success';

export const ValidateUrlPaths = {
  validate: '/verifier/validate',
  scanQRCode: '/verifier/validate/scan-qr-code',
  validateSuccess: '/verifier/validate/success',
};

export const ValidateRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route exact path={ValidateUrlPaths.validate}>
        <Validate />
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
        <MenuItem component={Link} to={routes.verifier.scanQRCode}>
          <ListItemIcon>
            <BeenhereIcon />
          </ListItemIcon>
          <ListItemText>COVID Certificate is valid</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={routes.verifier.scanQRCode}>
          <ListItemIcon>
            <BeenhereIcon />
          </ListItemIcon>
          <ListItemText>2x COVID vaccines</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={routes.verifier.scanQRCode}>
          <ListItemIcon>
            <BeenhereIcon />
          </ListItemIcon>
          <ListItemText>
            2x COVID vaccines
            <br />
            over 18 years old
          </ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={routes.verifier.scanQRCode}>
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
