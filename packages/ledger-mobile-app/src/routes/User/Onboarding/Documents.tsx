import { Grid, Paper, Typography } from '@material-ui/core';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import * as React from 'react';
import { styled } from '@material-ui/core/styles';

const Item = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
}));

export const OnboardingDocuments: React.FC = () => (
  <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    <Typography component="div" mb={1}>
      Upload a photo of one of the following
    </Typography>

    <div>
      <Item>
        <DoubleArrowRoundedIcon sx={{ mr: 1 }} /> Driving license
      </Item>
      <Item>
        <DoubleArrowRoundedIcon sx={{ mr: 1 }} /> Passport
      </Item>
      <Item>
        <DoubleArrowRoundedIcon sx={{ mr: 1 }} /> Birth certificate
      </Item>
      <Item>
        <DoubleArrowRoundedIcon sx={{ mr: 1 }} /> Identity card
      </Item>
    </div>
  </Grid>
);
