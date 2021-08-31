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
  <Paper elevation={3} sx={{ px: 5, py: 4 }}>
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="div" mb={1}>
        You can upload
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
          <DoubleArrowRoundedIcon sx={{ mr: 1 }} /> Residency card
        </Item>
      </div>
    </Grid>
  </Paper>
);
