import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import RestartAltIcon from '@material-ui/icons/RestartAlt';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../Routes';
import { useIsDesktop } from '../../hooks/useIsDesktop';

export const VerifierBottomNav: React.FC = () => {
  const isDesktop = useIsDesktop();
  return (
    <Paper sx={{ width: '100%' }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlinedIcon />}
          component={Link}
          to={routes.home}
        />
        <BottomNavigationAction
          label="Verify again"
          icon={<RestartAltIcon />}
          component={Link}
          to={routes.verifier.home}
        />
        {isDesktop && (
          <BottomNavigationAction
            label="Patient mode"
            icon={<KeyboardArrowRightIcon />}
            component={Link}
            to={routes.patient.home}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
