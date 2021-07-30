import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { VaccinationCertificate } from './types';
import { VaccinationAdministrationContainer } from './Vaccines';
import exampleQRCode from '../../data/qr_code.png';

const CustomStyles = styled('div')(({ theme }) => ({
  'tr > th, .th-header': {
    color: theme.palette.grey['400'],
    fontWeight: 'normal',
    width: '50%',
  },
  'tr > td, .th-content': {
    fontWeight: 'bold',
  },
}));

const ImageWithPadding = styled('img')(({ theme }) => ({
  objectFit: 'contain',
  width: '100%',
}));

export interface VaccinationCertificateProps {
  vaccinationCertificate: VaccinationCertificate;
}

export const VaccinationCertificateContainer: React.FC<VaccinationCertificateProps> =
  ({ vaccinationCertificate }) => (
    <CustomStyles
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" mt={2} align="center">
        Vaccination Certificate
      </Typography>
      <Box
        sx={{
          my: 2,
          width: 175,
          height: 175,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageWithPadding src={exampleQRCode} />
      </Box>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Name
            </TableCell>
            <TableCell>{vaccinationCertificate.patient.displayName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Date of Birth
            </TableCell>
            <TableCell>
              {vaccinationCertificate.patient.dateOfBirth.toLocaleDateString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" sx={{ pt: 3 }}>
              Disease/Agent
            </TableCell>
            <TableCell sx={{ pt: 3 }}>
              {vaccinationCertificate.diseaseOrAgent}
            </TableCell>
          </TableRow>
          <VaccinationAdministrationContainer
            totalPrescribedDoses={
              vaccinationCertificate.vaccination.totalPrescribedDoses
            }
            vaccinationAdministrations={
              vaccinationCertificate.vaccination.doses
            }
          />
          <TableRow>
            <TableCell scope="row" sx={{ pt: 3 }} colSpan={2}>
              <div className="th-header">Issued by</div>
              <div className="th-content">
                {vaccinationCertificate.certificate.issuedBy.name}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell scope="row" colSpan={2}>
              <div className="th-header">Identifier</div>
              <div className="th-content">
                <code>{vaccinationCertificate.certificate.identifier}</code>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CustomStyles>
  );
