import * as React from 'react';
import { useRef } from 'react';
import Camera from 'react-html5-camera-photo';
import type { createWorker as createWorkerType } from 'tesseract.js';
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Grid,
  Paper,
} from '@material-ui/core';
import { useIsMounted } from '../../hooks/useIsMounted';

interface OCRFromCameraProps {
  staticImageUri?: string;
  onSuccess: (dataUri: string) => void;
}

const createWorker = (window as any).Tesseract
  .createWorker as typeof createWorkerType;

export const OCRFromCamera: React.FC<OCRFromCameraProps> = ({
  staticImageUri,
  onSuccess,
}) => {
  const isMounted = useIsMounted();
  const worker = useRef(
    createWorker({
      workerPath: 'https://unpkg.com/tesseract.js@v2.0.0/dist/worker.min.js',
      langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      corePath:
        'https://unpkg.com/tesseract.js-core@v2.0.0/tesseract-core.wasm.js',
    }),
  );
  const isInitialised = useRef<boolean>(false);
  const [busy, setBusy] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [imageUri, setImageUri] = React.useState<string>();

  React.useEffect(() => {
    // initialise OCR worker
    (async () => {
      await worker.current.load();
      await worker.current.loadLanguage('eng');
      await worker.current.initialize('eng');
      if (isMounted()) {
        isInitialised.current = true;
      }
      if (staticImageUri) {
        setImageUri(staticImageUri);
        setBusy(true);
        doFindText(staticImageUri);
      }
    })();
    return () => {
      // terminate the worker on unmounting
      worker.current.terminate();
    };
  }, [staticImageUri]);

  const doFindText = (uri: string) => {
    findText(uri)
      .then((value) => {
        if (value) {
          onSuccess(value);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => {
        if (isMounted()) {
          setBusy(false);
        }
      });
  };

  const findText = async (dataUri: string): Promise<string | null> => {
    if (isInitialised.current) {
      const {
        data: { text },
      } = await worker.current.recognize(dataUri);
      return text;
    }
    return null;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {!staticImageUri && !imageUri && (
        <Box className="nym-camera">
          <Camera
            isFullscreen={false}
            isImageMirror={false}
            idealFacingMode="environment"
            onTakePhoto={(dataUri) => {
              if (isMounted()) {
                setBusy(true);
                setImageUri(dataUri);
                doFindText(dataUri);
              }
            }}
          />
        </Box>
      )}
      {imageUri && (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            alt="Your document"
            src={imageUri}
            style={{ maxHeight: '50vh', maxWidth: '75vw' }}
          />
        </Paper>
      )}
      {busy && (
        <>
          <Box mt={2}>
            <CircularProgress />
          </Box>
          <Box mt={2}>Processing your details, please wait...</Box>
        </>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Oh no! Something went wrong.</AlertTitle>
          {error}
        </Alert>
      )}
    </Grid>
  );
};
