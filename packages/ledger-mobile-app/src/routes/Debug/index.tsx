import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import { DebugQRCodes } from '../../components/Debug/DebugQRCodes';
import { DebugOCR } from '../../components/Debug/DebugOCR';
import { DebugCovidCertificateDecode } from '../../components/Debug/DebugCovidCertificateDecode';
import { DebugQRCovidCertificate } from '../../components/Debug/DebugQRCovidCertificate';
import { DebugOCRStatic } from '../../components/Debug/DebugOCRStatic';

export const DebugUrlPaths = {
  home: '/debug',
  qrCode: '/debug/qrcode',
  ocr: '/debug/ocr',
  ocrStatic: '/debug/ocr-static',
  cert: '/debug/cert',
  qrCodeWithCert: '/debug/qr-with-cert',
};

export const DebugRoutes: React.FC = () => (
  <Switch>
    <Route exact path={DebugUrlPaths.qrCode}>
      <DebugQRCodes />
    </Route>
    <Route exact path={DebugUrlPaths.ocr}>
      <DebugOCR />
    </Route>
    <Route exact path={DebugUrlPaths.ocrStatic}>
      <DebugOCRStatic />
    </Route>
    <Route exact path={DebugUrlPaths.cert}>
      <DebugCovidCertificateDecode />
    </Route>
    <Route exact path={DebugUrlPaths.qrCodeWithCert}>
      <DebugQRCovidCertificate />
    </Route>
    <Route exact path={DebugUrlPaths.home}>
      <Container>
        <h1>Debugging</h1>
        <h3>With device camera</h3>
        <Box sx={{ pb: 2 }}>
          <Link to={DebugUrlPaths.qrCodeWithCert}>
            Test capturing an NHS/EU issued COVID certificates with a camera and
            decoding
          </Link>
        </Box>
        <Box sx={{ pb: 2 }}>
          <Link to={DebugUrlPaths.qrCode}>Test QR Code Capture</Link>
        </Box>
        <Box sx={{ pb: 2 }}>
          <Link to={DebugUrlPaths.ocr}>Test OCR in the browser</Link>
        </Box>
        <hr />
        <h3>Static data</h3>
        <Box sx={{ pb: 2 }}>
          <Link to={DebugUrlPaths.cert}>
            Test decoding NHS/EU issued COVID certificates in the browser from
            static data
          </Link>
        </Box>
        <Box sx={{ pb: 2 }}>
          <Link to={DebugUrlPaths.ocrStatic}>
            Test OCR on static images of passports and drivers licenses
          </Link>
        </Box>
      </Container>
    </Route>
  </Switch>
);
