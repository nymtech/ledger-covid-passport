import * as React from 'react';
import {
  Box,
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
import { Link } from 'react-router-dom';
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
  </Grid>
);
