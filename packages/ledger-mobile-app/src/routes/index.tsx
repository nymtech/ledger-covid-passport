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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  textAlign: 'center',
  minHeight: '40vh',
}));

export const HomePage: FC = () => (
  <Container>
    <h1>Nym Private COVID Certificate (PCC)</h1>
    <p>
      The existing Digital Covid Certificates do not provide strong privacy
      properties, it can expose a lot of information about an individual, and
      can further be used to create a map of the places the person has visited
      and therefore be used as a tracking system.
    </p>
    <p>
      We propose a privacy enhanced version using blinded and re-randomizable
      Coconut credentials that can tackle the above issues. We call this product
      Private Covid Certificate (PCC).
    </p>

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
            Minim ex deserunt incididunt nostrud incididunt veniam veniam
            occaecat proident dolore et laboris. Culpa aute enim irure elit
            commodo mollit elit ipsum quis anim fugiat sit quis. Esse sint
            laborum exercitation consectetur aliqua nostrud et mollit eiusmod eu
            excepteur mollit adipisicing velit. Officia velit proident irure qui
            culpa cillum veniam. Ipsum esse pariatur excepteur proident deserunt
            elit dolor enim adipisicing adipisicing proident proident aute
            voluptate pariatur.
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
            Non ut ipsum sint velit magna aute laboris amet velit mollit sit
            nulla ullamco. Dolore excepteur commodo velit aliquip quis nostrud
            adipisicing cillum exercitation nostrud. Proident ullamco cupidatat
            veniam occaecat laboris excepteur mollit consequat ad commodo ad
            anim labore nulla est exercitation. Tempor Lorem nisi aliqua ipsum
            eiusmod elit reprehenderit sit qui commodo proident ullamco
            reprehenderit excepteur aliqua ipsum culpa. Ex nostrud enim do
            occaecat ullamco magna.
          </p>
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Box pt={4}>
          Because this is still in development, you might need to use some of
          our <Link to={routes.debug.home}>debugging tools</Link>.
        </Box>
      </Grid>
    </Grid>
  </Container>
);
