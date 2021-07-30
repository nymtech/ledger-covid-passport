import * as React from 'react';
import { Box, Pagination, TableCell, TableRow } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import WarningAmberIcon from '@material-ui/icons/WarningAmber';
import { VaccinationAdministration } from './types';

const SpanWithStyles = styled('span')(({ theme }) => ({
  marginRight: theme.spacing(1),
  display: 'inline',
}));

export interface VaccinationAdministrationProps {
  totalPrescribedDoses: number;
  vaccinationAdministrations: VaccinationAdministration[];
}

export interface VaccinationProps {
  vaccinationAdministration?: VaccinationAdministration;
}

export const VaccinationAdministrationContainer: React.FC<VaccinationAdministrationProps> =
  ({ totalPrescribedDoses, vaccinationAdministrations }) => {
    const [doseIndex, setDoseIndex] = React.useState<number>(
      vaccinationAdministrations.length,
    );
    return (
      <>
        <TableRow>
          <TableCell
            scope="row"
            colSpan={2}
            sx={{
              pt: 4,
              fontWeight: 'bold',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <SpanWithStyles>Dose</SpanWithStyles>
                <SpanWithStyles>
                  {doseIndex + 1} / {totalPrescribedDoses}
                </SpanWithStyles>
              </Box>
              <Box>
                <Pagination
                  size="small"
                  defaultPage={vaccinationAdministrations.length + 1}
                  count={totalPrescribedDoses}
                  onChange={(_event, page) => setDoseIndex(page - 1)}
                />
              </Box>
            </Box>
          </TableCell>
        </TableRow>
        <Vaccination
          vaccinationAdministration={vaccinationAdministrations[doseIndex]}
        />
      </>
    );
  };

export const Vaccination: React.FC<VaccinationProps> = ({
  vaccinationAdministration,
}) => {
  if (!vaccinationAdministration) {
    return (
      <TableRow>
        <TableCell colSpan={2}>
          <Box
            flexDirection="row"
            display="flex"
            color="warning.main"
            border="1px solid"
            p={1}
          >
            <Box mr={2}>
              <WarningAmberIcon />
            </Box>
            <Box>Vaccine dose has not been administered yet</Box>
          </Box>
        </TableCell>
      </TableRow>
    );
  }
  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          Vaccine
        </TableCell>
        <TableCell>{vaccinationAdministration.vaccine.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          Med. product
        </TableCell>
        <TableCell>{vaccinationAdministration.vaccine.product}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          Manufacturer
        </TableCell>
        <TableCell>{vaccinationAdministration.vaccine.manufacturer}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          Date
        </TableCell>
        <TableCell>
          {vaccinationAdministration.administration.date.toLocaleDateString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          Country
        </TableCell>
        <TableCell>
          {vaccinationAdministration.administration.location.displayName}
        </TableCell>
      </TableRow>
    </>
  );
};
