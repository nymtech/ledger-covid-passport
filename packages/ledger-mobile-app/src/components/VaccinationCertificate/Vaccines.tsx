import * as React from 'react';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { VaccinationAdministration } from './types';

export interface VaccinationAdministrationProps {
  totalPrescribedDoses: number;
  vaccinationAdministrations: VaccinationAdministration[];
}

export const VaccinationAdministrationContainer: React.FC<VaccinationAdministrationProps> =
  ({ totalPrescribedDoses, vaccinationAdministrations }) => (
    <>
      {vaccinationAdministrations.map((a, index) => (
        <>
          <TableRow key={`vaccine-administration-${index}`}>
            <TableCell
              component="th"
              scope="row"
              sx={{ pt: 4, fontWeight: 'bold' }}
              colSpan={2}
            >
              Dose {index + 1} / {totalPrescribedDoses}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Vaccine
            </TableCell>
            <TableCell>{a.vaccine.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Med. product
            </TableCell>
            <TableCell>{a.vaccine.product}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Manufacturer
            </TableCell>
            <TableCell>{a.vaccine.manufacturer}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Date
            </TableCell>
            <TableCell>{a.administration.date.toLocaleDateString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Country
            </TableCell>
            <TableCell>{a.administration.location.displayName}</TableCell>
          </TableRow>
        </>
      ))}
    </>
  );
