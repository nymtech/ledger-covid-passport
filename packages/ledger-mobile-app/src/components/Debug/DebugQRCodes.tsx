import * as React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MobileStepper,
  Paper,
  Radio,
  RadioGroup,
  useTheme,
} from '@material-ui/core';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { StepProps } from '@material-ui/core/Step/Step';
import { OnResultFunction } from '@blackbox-vision/react-qr-reader/dist-types/types';
import { useHistory } from 'react-router-dom';

const steps = ['Choose a camera to use', 'Scan a QR code', 'View results'];

const getStepsDefaults = () =>
  steps.map((step) => ({ key: step, title: step, completed: false }));

interface State {
  stepProps: StepProps[];
  facingMode: 'environment' | 'user';
  activeStep: number;
  valueHistory: any[];
  videoId: string;
}

const getDefaultState = (): State => ({
  activeStep: 0,
  facingMode: 'environment',
  valueHistory: [],
  stepProps: getStepsDefaults(),
  videoId: `video-${new Date().toISOString()}`,
});

export const DebugQRCodes: React.FC = () => {
  const history = useHistory();
  const [state, setState] = React.useState<State>(getDefaultState());
  const theme = useTheme();
  const maxSteps = 3;

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

  const handleReset = () => {
    setState(getDefaultState());
  };

  const handleResult = React.useCallback<OnResultFunction>(
    (result, error) => {
      const newValue: any = { ...(result || { error }) };
      if (newValue && Object.keys(newValue) && !('error' in newValue)) {
        setState((prevState) => ({
          ...prevState,
          valueHistory: [newValue, ...prevState.valueHistory],
          ...(prevState.activeStep === 1 ? { activeStep: 2 } : undefined),
        }));
      }
    },
    [state],
  );

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
              onChange={(event, newValue) =>
                setState((prevState) => ({
                  ...prevState,
                  facingMode: newValue as 'environment' | 'user',
                }))
              }
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
          <>
            <Paper elevation={2} sx={{ p: 2, background: '#eee' }}>
              {state.valueHistory.length} values found
              <code style={{ marginLeft: '2rem' }}>
                {`${(state.valueHistory[0]?.text || '').slice(0, 20)}...`}
              </code>
            </Paper>
            <QrReader
              key={state.videoId}
              videoId={state.videoId}
              constraints={{ facingMode: state.facingMode }}
              onResult={handleResult}
              containerStyle={{ maxWidth: '90vw' }}
            />
          </>
        );
      case 2:
        return (
          <>
            <Paper elevation={2} sx={{ p: 2, background: '#eee' }}>
              {state.valueHistory.length} values found
            </Paper>
            {state.valueHistory.length && (
              <Paper
                elevation={2}
                sx={{
                  mt: 1,
                  p: 2,
                  background: '#ddd',
                }}
              >
                <Box sx={{ opacity: 0.25, pb: 1 }}>
                  Latest text value found:
                </Box>
                <Box sx={{ fontFamily: 'monospace' }}>
                  {state.valueHistory[0].text}
                </Box>
              </Paper>
            )}
            <Box sx={{ opacity: 0.25, pt: 2, pb: 1 }}>All values found:</Box>
            {state.valueHistory.map((item, index) => (
              <Box
                sx={{
                  fontSize: 'small',
                  fontFamily: 'monospace',
                  p: 1,
                  borderBottom: '2px #eee solid',
                }}
                key={`history-${index}`}
              >
                {index}:{' '}
                {index === 0 ? (
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                ) : (
                  JSON.stringify(item)
                )}
              </Box>
            ))}
          </>
        );
      default:
        return <>Oh no! Something went wrong</>;
    }
  }, [state]);

  return (
    <Grid container direction="column" height="100vh" pt={5} px={4}>
      {state.activeStep === 0 && (
        <>
          <h1>Debug QR Codes</h1>
          <div>
            Tests QR capture from device camera and displays decoded data
          </div>
        </>
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
                (state.activeStep === 1 && state.valueHistory.length < 1)
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
      <Box sx={{ width: '100%', overflow: 'auto', flexGrow: 1, pb: 2 }}>
        {getStep()}
      </Box>
    </Grid>
  );
};
