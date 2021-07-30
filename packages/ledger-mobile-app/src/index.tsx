import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import QrScanner from 'qr-scanner';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';
import exampleQRCode from './data/qr_code.png';

/**
 * Set up QR code scanner web worker thread. See https://webpack.js.org/guides/asset-modules/ for loader details.
 */
// eslint-disable-next-line import/extensions
QrScanner.WORKER_PATH = require('../node_modules/qr-scanner/qr-scanner-worker.min.js');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

(async () => {
  console.log('qrcode', { exampleQRCode });
  const qrcode = await QrScanner.scanImage(exampleQRCode);
  console.log('qrcode(2)', { qrcode });
})();
