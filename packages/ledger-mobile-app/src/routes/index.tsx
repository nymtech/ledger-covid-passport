import { Link } from 'react-router-dom';
import * as React from 'react';
import { FC } from 'react';
import { Container, Grid, Paper, Box, Typography } from '@material-ui/core';
import LocalPoliceIcon from '@material-ui/icons/LocalPolice';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { styled } from '@material-ui/core/styles';
import { PatientBackground } from 'src/components/PatientContainer';
import { routes } from '../Routes';
import { VerifierBackground } from '../components/VerifierContainer';
import { NavAwareDocs } from '../components/NavAwareDocs';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  textAlign: 'center',
  minHeight: '40vh',
}));

export const HomePage: FC = () => (
  <Container>
    <NavAwareDocs />

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Item sx={{ background: PatientBackground }}>
          <Link to={routes.user.home}>
            <Box display="flex" alignContent="center" justifyContent="center">
              <EmojiPeopleIcon />
              <Typography mx={1} fontSize="large">
                End User
              </Typography>
              <ChevronRightIcon />
            </Box>
          </Link>
          <p>
            The End User in Nym PCC is someone who has received two doses of
            COVID-19 vaccine, or had previously been affected and has now tested
            negative.
          </p>
        </Item>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Item sx={{ background: VerifierBackground }}>
          <Link to={routes.verifier.home}>
            <Box display="flex" alignContent="center" justifyContent="center">
              <LocalPoliceIcon />
              <Typography mx={1} fontSize="large">
                Verifier
              </Typography>
              <ChevronRightIcon />
            </Box>
          </Link>
          <p>
            The Verifier in this system is someone who needs to check the End
            User's digital certificate (credential). The Verifier can be a
            border officer, the security at a restaurant, etc.
          </p>
        </Item>
      </Grid>
    </Grid>
  </Container>
);
