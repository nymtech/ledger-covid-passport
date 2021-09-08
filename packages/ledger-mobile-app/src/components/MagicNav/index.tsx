import * as React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import { routes } from '../../Routes';

export const MagicNav: React.FC = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path: string) => {
    setAnchorEl(null);
    history.push(path);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ExploreIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Route path={routes.verifier.home}>
          <MenuItem onClick={() => handleClose(routes.verifier.home)}>
            Splash screen
          </MenuItem>
          <MenuItem onClick={() => handleClose(routes.verifier.validate)}>
            Validate
          </MenuItem>
          <MenuItem
            onClick={() => handleClose(routes.verifier.validateSuccess)}
          >
            {'Validate > Success'}
          </MenuItem>
        </Route>
        <Route path={routes.user.home}>
          <MenuItem onClick={() => handleClose(routes.user.home)}>
            Splash screen
          </MenuItem>
          <MenuItem onClick={() => handleClose(routes.user.app.home)}>
            App home
          </MenuItem>
          <MenuItem
            onClick={() => handleClose(routes.user.app.view.covidPass.home)}
          >
            COVID Pass Home
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleClose(routes.user.app.view.covidPass.confirmVerifierCode)
            }
          >
            {'COVID Pass > Verifier Code > Confirm'}
          </MenuItem>
        </Route>
      </Menu>
    </>
  );
};
