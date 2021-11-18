import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Theme,
  useTheme,
} from '@material-ui/core';
import QrCodeScannerIcon from '@material-ui/icons/QrCodeScanner';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { routes } from '../../../Routes';

export const AppNav: React.FC = () => {
  const theme: Theme = useTheme();
  return (
    <>
      <Paper sx={{ width: '100%' }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction />
          <BottomNavigationAction
            label="Show PCC"
            icon={<QrCodeScannerIcon />}
            component={Link}
            to={routes.user.app.view.covidPass.scanVerifierCode}
            sx={{
              background: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
          />
          <BottomNavigationAction
            label="Wallet"
            icon={<AccountBalanceWalletIcon />}
            component={Link}
            to={routes.user.app.home}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};
