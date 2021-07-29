import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { VaccinationCertificate } from './types';
import { VaccinationAdministrationContainer } from './Vaccines';

export interface VaccinationCertificateProps {
  vaccinationCertificate: VaccinationCertificate;
}

export const VaccinationCertificateContainer: React.FC<VaccinationCertificateProps> =
  ({ vaccinationCertificate }) => (
    <Box
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
          width: 200,
          height: 200,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          bgcolor: 'gray',
        }}
      >
        <div>QR Code</div>
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
            <TableCell component="th" scope="row" sx={{ pt: 3 }} colSpan={2}>
              <div>Issued by</div>
              <div>{vaccinationCertificate.certificate.issuedBy.name}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" colSpan={2}>
              <div>Identifier</div>
              <div>
                <code>{vaccinationCertificate.certificate.identifier}</code>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
