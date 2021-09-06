import * as React from 'react';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import BeenhereIcon from '@material-ui/icons/BeenhereOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../Routes';

export const ValidateSuccess: React.FC = () => {
  const history = useHistory();
  const theme = useTheme();
  return (
    <Grid
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={2}
    >
      <Grid
        display="flex"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <div>
          <Button
            sx={{ mx: 0, p: 0 }}
            to={routes.verifier.validate}
            component={Link}
          >
            <KeyboardArrowLeftIcon /> Back
          </Button>
        </div>
      </Grid>
      <h2>Success</h2>
      <Paper
        sx={{
          p: 2,
          color: theme.palette.common.white,
          background: theme.palette.success.light,
        }}
      >
        <div>
          <BeenhereIcon />
        </div>
        <Box fontSize="large" fontWeight="400">
          The user has presented a valid certificate
        </Box>
      </Paper>
      <Box mt={4} mb={2}>
        It also confirms the following
      </Box>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckBoxOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="COVID certificate is valid" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckBoxOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="2x vaccinations" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckBoxOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Over 18 years old" />
        </ListItem>
      </List>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={6}
        width="100%"
      >
        <Box>
          <Button
            variant="contained"
            to={routes.verifier.validate}
            component={Link}
            sx={{ py: 2 }}
          >
            Next <KeyboardArrowRightIcon />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
