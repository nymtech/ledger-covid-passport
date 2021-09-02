import * as React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { Link } from 'react-router-dom';
import { routes } from '../../Routes';

export const SwitchToVerifier: React.FC = () => (
  <ButtonGroup color="secondary" variant="text">
    <Button to={routes.home} component={Link}>
      <HomeOutlinedIcon />
    </Button>
    <Button to={routes.verifier.home} component={Link}>
      Switch to Verifier <KeyboardArrowRightIcon />
    </Button>
  </ButtonGroup>
);

export const SwitchToPatient: React.FC = () => (
  <ButtonGroup color="secondary" variant="text">
    <Button to={routes.home} component={Link}>
      <HomeOutlinedIcon />
    </Button>
    <Button to={routes.user.home} component={Link}>
      Switch to End User <KeyboardArrowRightIcon />
    </Button>
  </ButtonGroup>
);
