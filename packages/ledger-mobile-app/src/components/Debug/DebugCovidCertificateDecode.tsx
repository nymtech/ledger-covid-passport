import * as React from 'react';
import { Box, Container, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { decodeCovidCertificate } from '../../utils/covid-certificate-decoder';
import { routes } from '../../Routes';

const qrCodeContents =
  'HC1:NCFOXN%TSMAHN-H%OCHOS80JS3NL73:D4+OV-36HD7AOMOW4S2S**J4G5W/JT3FF/8X*G3M9BM9Z0BZW4V/AY733J7%2HV77ADFYRVNDF.93$PN-*0X37*090GVVNNGM5V.499TP+M5*K*U3*96846A$Q 76UW62U10%MPF65ZMNH6LK92R5QV1O2R0NLD+9 BLXE6UC65ZM176NF675IPF5$5QA46/Q6576PR6PF5RBQ746B46O1N646RM9XC5.Q69L6-96QW6U46%E5 NPC71AL6ZO66X69/9-3AKI63ZMLEQZ76UW6*E99Q9E$BDZIE9J/MJFZI*IB*NIZ0KA42BKBTKBA4229BCWKXSJGZI8DJC0J*PITQTA.SGD32OIZ0K%GA+ESCQSETC%ESISTR SR63+NTWVBDKBYLDN4DE1D-NSLFUKQ9B.UP-1AZJS9JE6F*ZJKE7+3G3UUS.77SU1QUB5JPN2R*O55OOQC*3JSH53SFN*46PBMZL+H2%-T$LVVV1Y:D3T3AP7BFPI7SYM0/KO+DG';

const links = [
  'https://github.com/ehn-dcc-development',
  'https://github.com/ehn-dcc-development/hcert-spec/blob/main/hcert_spec.md',
  'https://ec.europa.eu/health/sites/default/files/ehealth/docs/digital-green-certificates_v3_en.pdf',
  'https://ec.europa.eu/health/sites/default/files/ehealth/docs/covid-certificate_json_specification_en.pdf',
  'https://datatracker.ietf.org/doc/html/rfc8392',
  'https://ehealth.vyncke.org/',
  'https://github.com/ehn-dcc-development/ehn-sign-verify-javascript-trivial/blob/main/cose_verify.js',
  'https://github.com/eu-digital-green-certificates/dgc-testdata/issues/187',
  'https://github.com/lovasoa/sanipasse/blob/master/src/assets/Digital_Green_Certificate_Signing_Keys.json',
];

export const DebugCovidCertificateDecode: React.FC = () => {
  const [cert, setCert] = React.useState<any>();
  React.useEffect(() => {
    decodeCovidCertificate(qrCodeContents).then((newCert) => setCert(newCert));
  }, []);
  return (
    <Container>
      <Link to={routes.debug.home}>Back</Link>
      <h3>Debug COVID-19 Certificate Decoding</h3>
      <div>
        Tests decoding the contents of the QR codes in COVID Certificates /
        Passports. See the following for more technical information:
      </div>
      <Box
        pt={2}
        pb={3}
        sx={{ width: '100%', overflowX: 'auto', a: { whiteSpace: 'nowrap' } }}
      >
        {links.map((link) => (
          <div key={`link-${link}`}>
            <a href={link}>{link}</a>
          </div>
        ))}
      </Box>
      <Box pt={2}>
        <code>QR code ➡ string</code>
      </Box>
      <Box pt={2} fontFamily="monospace">
        <Paper sx={{ p: 2, width: '100%', overflow: 'auto' }} elevation={3}>
          {qrCodeContents}
        </Paper>
      </Box>
      <Box pt={2}>
        <code>
          QR code ➡ string ➡ base45 decode ➡ inflate ➡ CBOR decode ➡ object
        </code>
      </Box>
      <Box pt={2}>
        This decodes into the following structured data (excluding signatures
        etc):
      </Box>
      <Box pt={2}>
        <Paper sx={{ p: 2, width: '100%', overflow: 'auto' }} elevation={3}>
          <pre>{JSON.stringify(cert, null, 2)}</pre>
        </Paper>
      </Box>
    </Container>
  );
};
