import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MobileStepper,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@material-ui/core';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import { useHistory } from 'react-router-dom';
import { StepProps } from '@material-ui/core/Step/Step';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { decodeCovidCertificate } from '../../utils/covid-certificate-decoder';

interface State {
  stepProps: StepProps[];
  facingMode: 'environment' | 'user';
  activeStep: number;
  videoId: string;
  value: any;
  error: any;
  parsed?: string;
}

const steps = ['Choose a camera to use', 'Scan a QR code'];

const getStepsDefaults = () =>
  steps.map((step) => ({ key: step, title: step, completed: false }));

const getDefaultState = (): State => ({
  activeStep: 0,
  facingMode: 'environment',
  stepProps: getStepsDefaults(),
  videoId: `video-${new Date().toISOString()}`,
  value: undefined,
  parsed: undefined,
  error: undefined,
});

export const DebugQRCovidCertificate: React.FC = () => {
  const history = useHistory();
  const [state, setState] = React.useState<State>(getDefaultState());
  const theme = useTheme();
  const maxSteps = 2;

  const handleReset = () => {
    setState(getDefaultState());
  };

  const handleNext = () => {
    setState((prevState) => ({
      ...prevState,
      activeStep: prevState.activeStep + 1,
    }));
  };

  const handleBack = () => {
    if (state.activeStep === 0) {
      history.goBack();
    } else {
      setState((prevState) => ({
        ...prevState,
        activeStep: prevState.activeStep - 1,
      }));
    }
  };

  React.useEffect(() => {
    if (state.value && !state.parsed) {
      decodeCovidCertificate(state.value)
        .then((newCert) =>
          setState((prevState) => ({ ...prevState, parsed: newCert })),
        )
        .catch((error) => setState((prevState) => ({ ...prevState, error })));
    }
  }, [state.value]);

  const getStep = React.useCallback(() => {
    switch (state.activeStep) {
      case 0:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Select the camera to use</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={state.facingMode}
              onChange={(event, newValue) => {
                setState((prevState) => ({
                  ...prevState,
                  facingMode: newValue as 'environment' | 'user',
                }));
              }}
            >
              <FormControlLabel
                value="environment"
                control={<Radio />}
                label="Environment (rear camera)"
              />
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="User (front camera)"
              />
            </RadioGroup>
          </FormControl>
        );
      case 1:
        return (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {!state.value && (
              <QrReader
                key={state.videoId}
                videoId={state.videoId}
                constraints={{ facingMode: state.facingMode }}
                onResult={(result, error) => {
                  if (result && !state.value) {
                    const value = result.getText();
                    console.log('Found QR code', {
                      result,
                      error,
                      state,
                      value,
                    });
                    setState((prevState) => ({
                      ...prevState,
                      value,
                      error: undefined,
                    }));
                  }
                }}
                containerStyle={{ width: '100%' }}
              />
            )}
            {(!state.parsed || !state.value) && (
              <>
                <Box mt={2}>
                  <CircularProgress />
                </Box>
                {!state.value && (
                  <Typography color="#aaa">
                    Searching for a valid QR code...
                  </Typography>
                )}
                {state.value && !state.parsed && (
                  <Typography color="#aaa">Parsing QR code...</Typography>
                )}
              </>
            )}

            {state.parsed && (
              <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Alert severity="success" sx={{ mt: 5 }}>
                  Found a QR code and parsed it!
                  <Button
                    sx={{ ml: 2 }}
                    color="success"
                    variant="outlined"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Alert>
                <Paper
                  sx={{
                    my: 3,
                    p: 2,
                    width: '100%',
                    height: '100%',
                    overflowX: 'auto',
                  }}
                  elevation={3}
                >
                  <pre>{JSON.stringify(state.parsed, null, 2)}</pre>
                </Paper>
              </Box>
            )}
          </Grid>
        );
      default:
        return <div>Oh no! Something went wrong</div>;
    }
  }, [state]);

  return (
    <Container>
      {state.activeStep === 0 && (
        <>
          <h3>Debug COVID-19 Certificate Decoding From QR Code</h3>
          <div>
            Tests QR capture from device camera and tries to decode COVID
            certificate
          </div>
        </>
      )}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
        mb={10}
        px={1}
        width="100%"
      >
        {state.error && (
          <Alert severity="error" sx={{ mt: 5 }}>
            Oh no! An error occurred. {state.error.message || ''}
            <Button
              sx={{ ml: 2 }}
              color="error"
              variant="outlined"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Alert>
        )}
        <MobileStepper
          variant="text"
          sx={{
            background: theme.palette.grey['300'],
          }}
          steps={maxSteps}
          position="bottom"
          activeStep={state.activeStep}
          nextButton={
            state.activeStep === maxSteps - 1 ? (
              <Button size="small" onClick={handleReset}>
                Reset
              </Button>
            ) : (
              <Button
                size="small"
                onClick={handleNext}
                disabled={
                  state.activeStep === maxSteps - 1 ||
                  (state.activeStep === 1 && !state.value)
                }
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            )
          }
          backButton={
            <Button size="small" onClick={handleBack}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
        <Box sx={{ width: '100%', flexGrow: 1, pb: 2 }}>{getStep()}</Box>
      </Grid>
    </Container>
  );
};
