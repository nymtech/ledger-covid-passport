import * as React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { routes } from '../../../../Routes';
import { VaccinationCertificate } from '../../../../components/VaccinationCertificate/types';
import { VaccinationCertificateContainer } from '../../../../components/VaccinationCertificate';

export const CovidPassShow: React.FC = () => (
  <Grid
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    mt={5}
    px={2}
  >
    <Button
      sx={{ mx: 0, p: 0 }}
      to={routes.user.app.view.covidPass.home}
      component={Link}
    >
      <KeyboardArrowLeftIcon /> Back
    </Button>
    <VaccinationCertificateContainer
      vaccinationCertificate={vaccinationCertificate}
    />
  </Grid>
);

const vaccinationCertificate: VaccinationCertificate = {
  patient: {
    displayName: 'DOE Joe',
    givenName: 'Joe',
    familyName: 'Doe',
    dateOfBirth: new Date(1957, 6, 5),
  },
  diseaseOrAgent: 'SARS-CoV-19',
  vaccination: {
    totalPrescribedDoses: 2,
    doses: [
      {
        doseNumber: 1,
        vaccine: {
          manufacturer: 'BioNTech',
          name: 'C19-mRNA',
          product: 'Comirnaty',
        },
        administration: {
          date: new Date(Date.parse('2021-02-24 13:42:01')),
          location: {
            iso3166Alpha2: 'BE',
            displayName: 'Belgium',
          },
        },
      },
    ],
  },
  certificate: {
    identifier: 'V1-BE-12345678ASBCD-56789-44',
    issuedBy: {
      name: 'BE National Health Service',
    },
  },
};
