import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { PatientLayout as Layout } from '../../../layouts/DefaultLayout';
import { VaccinationCertificate } from '../../../components/VaccinationCertificate/types';
import { VaccinationCertificateContainer } from '../../../components/VaccinationCertificate';
import { PatientBottomNav } from '../../../components/Navs/PatientBottomNav';

export const CertificateUrlPaths = {
  certificate: '/patient/certificate',
};

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

export const CertificateRoutes: React.FC = () => (
  <Layout>
    <Switch>
      <Route exact path={CertificateUrlPaths.certificate}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              height: '100%',
            }}
          >
            <VaccinationCertificateContainer
              vaccinationCertificate={vaccinationCertificate}
            />
          </Box>
          <PatientBottomNav />
        </Box>
      </Route>
    </Switch>
  </Layout>
);
