import * as React from 'react';
import { Container } from '@material-ui/core';
import { IPhoneX } from './components/Devices/IPhoneX';
import { VaccinationCertificateContainer } from './components/VaccinationCertificate';
import { VaccinationCertificate } from './components/VaccinationCertificate/types';

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

export const App: React.FC = () => (
  <Container sx={{ p: 10 }}>
    <IPhoneX>
      <VaccinationCertificateContainer
        vaccinationCertificate={vaccinationCertificate}
      />
    </IPhoneX>
  </Container>
);
