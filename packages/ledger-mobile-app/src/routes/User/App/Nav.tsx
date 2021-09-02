import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Fade,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Theme,
  Typography,
  useTheme,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BeenhereIcon from '@material-ui/icons/BeenhereOutlined';
import AutoAwesomeOutlinedIcon from '@material-ui/icons/AutoAwesomeOutlined';
import DirectionsCarFilledOutlinedIcon from '@material-ui/icons/DirectionsCarFilledOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { routes } from '../../../Routes';

export const AppNav: React.FC = () => {
  const theme: Theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                maxWidth: '300px',
                background: theme.palette.primary.light,
                color: theme.palette.common.white,
              }}
            >
              <Typography
                px={2}
                py={1}
                variant="overline"
                display="block"
                gutterBottom
              >
                Add an item to your wallet
              </Typography>
              <MenuList>
                <MenuItem
                  component={Link}
                  to={routes.user.app.add.covidPass}
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <BeenhereIcon sx={{ color: theme.palette.common.white }} />
                  </ListItemIcon>
                  <ListItemText>COVID Pass</ListItemText>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemIcon>
                    <AssignmentIcon
                      sx={{ color: theme.palette.common.white }}
                    />
                  </ListItemIcon>
                  <ListItemText>COVID Test Result</ListItemText>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemIcon>
                    <DirectionsCarFilledOutlinedIcon
                      sx={{ color: theme.palette.common.white }}
                    />
                  </ListItemIcon>
                  <ListItemText>Drivers License</ListItemText>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemIcon>
                    <CreditCardOutlinedIcon
                      sx={{ color: theme.palette.common.white }}
                    />
                  </ListItemIcon>
                  <ListItemText>Social Security Card</ListItemText>
                </MenuItem>
                <MenuItem disabled>
                  <ListItemIcon>
                    <AutoAwesomeOutlinedIcon
                      sx={{ color: theme.palette.common.white }}
                    />
                  </ListItemIcon>
                  <ListItemText>Super Hero Id</ListItemText>
                </MenuItem>
              </MenuList>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Paper sx={{ width: '100%' }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Nym Passport"
            icon={<EmojiPeopleIcon />}
            component={Link}
            to={routes.user.app.view.nymPassport}
            onClick={() => setOpen(false)}
          />
          <BottomNavigationAction
            label="Add to wallet"
            icon={<AddCircleOutlineIcon />}
            sx={{
              background: theme.palette.primary.main,
              color: theme.palette.common.white,
            }}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setOpen((prevState) => !prevState);
            }}
          />
          <BottomNavigationAction
            label="Wallet"
            icon={<AccountBalanceWalletIcon />}
            component={Link}
            to={routes.user.app.home}
            onClick={() => setOpen(false)}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};
