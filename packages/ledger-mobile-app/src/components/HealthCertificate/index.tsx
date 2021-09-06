import * as React from 'react';
import { Box, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { HCert, HCertWrapper } from '../../models/hcert';
import { valueSets } from '../../models/valuesets';

interface HealthCertificateProps {
  wrapper?: HCertWrapper;
}

export const HealthCertificate: React.FC<HealthCertificateProps> = ({
  wrapper,
}) => {
  if (!wrapper) {
    return null;
  }
  const cert = wrapper.hcert.iss;
  const vaccination = wrapper.hcert.iss.v[0];
  return (
    <Table size="small" width="100%">
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row">
            Name
          </TableCell>
          <TableCell>{`${cert.nam.fn}, ${cert.nam.gn}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Date of Birth
          </TableCell>
          <TableCell>{cert.dob}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row" sx={{ pt: 3 }}>
            Disease/Agent
          </TableCell>
          <TableCell sx={{ pt: 3 }}>
            {valueSets.tgToValue(vaccination.tg)?.display || vaccination.tg}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell
            scope="row"
            colSpan={2}
            sx={{
              pt: 4,
              fontWeight: 'bold',
            }}
          >
            Dose {vaccination.dn} of {vaccination.sd}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell component="th" scope="row">
            Vaccine
          </TableCell>
          <TableCell>
            {valueSets.vpToValue(vaccination.vp)?.display || vaccination.vp}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Med. product
          </TableCell>
          <TableCell>
            {valueSets.mpToValue(vaccination.mp)?.display || vaccination.mp}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Manufacturer
          </TableCell>
          <TableCell>
            {valueSets.maToValue(vaccination.ma)?.display || vaccination.ma}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Date
          </TableCell>
          <TableCell>{vaccination.dt}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Country
          </TableCell>
          <TableCell>{vaccination.co}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell sx={{ pt: 3 }}>Issued by</TableCell>
          <TableCell sx={{ pt: 3 }}>{vaccination.is}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Identifier</TableCell>
          <TableCell>
            {vaccination.ci.slice(0, 5)}...{vaccination.ci.slice(-5)}
          </TableCell>
        </TableRow>
        {/* <TableRow> */}
        {/*  <TableCell scope="row" colSpan={2} sx={{ maxWidth: '90%' }}> */}
        {/*    <div className="th-header">Identifier</div> */}
        {/*    <Box className="th-content" sx={{ overflowX: 'auto' }}> */}
        {/*      <code>{vaccination.ci}</code> */}
        {/*    </Box> */}
        {/*  </TableCell> */}
        {/* </TableRow> */}
      </TableBody>
    </Table>
  );
};
