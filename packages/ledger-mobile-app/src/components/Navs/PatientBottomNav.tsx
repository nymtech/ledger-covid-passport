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

export const PatientBottomNav: React.FC = () => {
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
          label="Restart"
          icon={<RestartAltIcon />}
          component={Link}
          to={routes.user.app.home}
        />
        {isDesktop && (
          <BottomNavigationAction
            label="Verifier mode"
            icon={<KeyboardArrowRightIcon />}
            component={Link}
            to={routes.verifier.home}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
