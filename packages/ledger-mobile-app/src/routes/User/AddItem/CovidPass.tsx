import * as React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useAppState } from '../../../components/StateProvider';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { routes } from '../../../Routes';
import { decodeCovidCertificateAndValidate } from '../../../utils/covid-certificate-decoder';
import {
  HCertWrapper,
  isHCertWrapperVaccinationRecord,
} from '../../../models/hcert';
import { HealthCertificate } from '../../../components/HealthCertificate';
import { HCertValidity } from '../../../components/HealthCertificate/HCertValidity';

export const AddCovidPass: React.FC = () => {
  const videoId = React.useRef(`video-${new Date().toISOString()}`);
  const state = useAppState();
  const [value, setValue] = React.useState<string>();
  const [certificate, setCertificate] = React.useState<HCertWrapper | null>(
    null,
  );
  const [error, setError] = React.useState<Error>();
  const history = useHistory();
  const isMounted = useIsMounted();
  const isCertificateParsed =
    certificate && isHCertWrapperVaccinationRecord(certificate);

  React.useEffect(() => {
    if (value) {
      decodeCovidCertificateAndValidate(value)
        .then((newValue) => {
          setCertificate(newValue);
          state.setHCert(newValue);
        })
        .catch(setError);
    }
  }, [value]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={4}
    >
      <Box width="100%">
        <Button sx={{ mx: 0, p: 0 }} to={routes.user.app.home} component={Link}>
          <KeyboardArrowLeftIcon /> Back
        </Button>
      </Box>

      {!certificate && <h2 style={{ width: '100%' }}>Scan a QR code</h2>}
      {isCertificateParsed && (
        <Box my={2}>
          <Button
            sx={{ p: 2 }}
            variant="contained"
            onClick={() => history.push(routes.user.app.view.covidPass.home)}
          >
            Add to wallet <KeyboardArrowRightIcon />
          </Button>
        </Box>
      )}
      {!value && (
        <>
          <QrReader
            videoId={videoId.current}
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (result) {
                if (isMounted()) {
                  setValue(result.getText());
                }
              }
            }}
            containerStyle={{ width: '100%' }}
          />
          <Box mt={2}>
            <CircularProgress />
          </Box>
          <Typography color="#aaa">Searching for a valid QR code...</Typography>
        </>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Oh no! Something went wrong.</AlertTitle>
          <div>{error.message}</div>
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setValue(undefined);
                setError(undefined);
              }}
            >
              Try again
            </Button>
          </Box>
        </Alert>
      )}
      {!error && value && !certificate && (
        <>
          <Box mt={2}>
            <CircularProgress />
          </Box>
          <Typography color="#aaa">Processing QR code data...</Typography>
        </>
      )}
      {certificate && (
        <Box width="100%">
          <Grid
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            mb={2}
          >
            {isCertificateParsed && <HCertValidity wrapper={certificate} />}
          </Grid>
          <HealthCertificate wrapper={certificate} />
        </Box>
      )}
    </Grid>
  );
};
