import * as React from 'react';
import {
  Box,
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@material-ui/core';
import BeenhereIcon from '@material-ui/icons/BeenhereOutlined';
import DirectionsCarFilledOutlinedIcon from '@material-ui/icons/DirectionsCarFilledOutlined';
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import AutoAwesomeOutlinedIcon from '@material-ui/icons/AutoAwesomeOutlined';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../Routes';

export const AppHome: React.FC = () => (
  <Grid
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    mt={5}
    px={2}
    width="100%"
  >
    <Typography
      mb={3}
      textAlign="center"
      variant="overline"
      display="block"
      gutterBottom
    >
      Wallet items
    </Typography>
    <Box>
      <MenuList>
        <MenuItem component={Link} to={routes.user.app.view.covidPass.home}>
          <ListItemIcon>
            <BeenhereIcon />
          </ListItemIcon>
          <ListItemText>Private COVID Certificate</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText>COVID Test Result</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <DirectionsCarFilledOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Drivers License</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <CreditCardOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Social Security Card</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <AutoAwesomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Super Hero Id</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
    <Box mt={5}>
      <Button variant="outlined" disabled sx={{ ml: 1, py: 2 }}>
        <AddCircleOutlineIcon sx={{ mr: 1 }} />
        Add new item to wallet
        <KeyboardArrowRightIcon />
      </Button>
    </Box>
  </Grid>
);
