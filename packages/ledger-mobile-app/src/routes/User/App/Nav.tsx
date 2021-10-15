import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Theme,
  useTheme,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { routes } from '../../../Routes';

export const AppNav: React.FC = () => {
  const theme: Theme = useTheme();
  return (
    <>
      <Paper sx={{ width: '100%' }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Nym Id"
            icon={<EmojiPeopleIcon />}
            component={Link}
            to={routes.user.app.view.nymId}
          />
          <BottomNavigationAction
            label="Add to wallet"
            icon={<AddCircleOutlineIcon />}
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
