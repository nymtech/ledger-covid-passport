import * as React from 'react';
import {
  Alert,
  AlertTitle,
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
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { routes } from '../../../Routes';
import { useVerifierState } from '../../../state/verifier';

export const ValidateSuccess: React.FC = () => {
  const theme = useTheme();
  const state = useVerifierState();

  if (!state.verifyResult || !state.verifierPolicy) {
    return (
      <Grid
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={5}
        px={2}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <p>There are no verification results, please try again.</p>
        </Alert>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={6}
          width="100%"
        >
          <Button
            variant="contained"
            to={routes.verifier.validate}
            component={Link}
            sx={{ mx: 1, py: 2 }}
          >
            <KeyboardArrowLeftIcon /> Back
          </Button>
        </Grid>
      </Grid>
    );
  }

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
          background: state.verifyResult.result
            ? theme.palette.success.light
            : theme.palette.error.light,
        }}
      >
        <div>
          <BeenhereIcon />
        </div>
        <Box fontSize="large" fontWeight="400">
          {state.verifyResult.result === true
            ? 'The user has presented a valid certificate'
            : 'The certificate failed to meet the policy requirements'}
        </Box>
      </Paper>
      <Box mt={4} mb={2}>
        {state.verifyResult.result === true
          ? 'It also confirms the following'
          : 'The policy requirements that were failed were'}
      </Box>
      <List>
        <ListItem>
          <ListItemIcon>
            {state.verifierPolicy.is_vaccinated ? (
              <CheckBoxOutlinedIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="COVID certificate is valid" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {state.verifierPolicy.is_vaccinated ? (
              <CheckBoxOutlinedIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="2x vaccinations" />
        </ListItem>
        {state.verifierPolicy.is_over_18 && !state.verifierPolicy.is_over_21 && (
          <ListItem>
            <ListItemIcon>
              <CheckBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Over 18 years old" />
          </ListItem>
        )}
        {state.verifierPolicy.is_over_21 && (
          <ListItem>
            <ListItemIcon>
              <CheckBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Over 21 years old" />
          </ListItem>
        )}
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
