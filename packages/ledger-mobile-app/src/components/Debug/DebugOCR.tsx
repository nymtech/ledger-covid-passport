import * as React from 'react';
import { Box, Button, Container, Grid, Paper } from '@material-ui/core';
import { OCRFromCamera } from '../OCRFromCamera';

export const DebugOCR: React.FC = () => {
  const [value, setValue] = React.useState<string>();
  const [key, setKey] = React.useState(new Date().toISOString());
  return (
    <Container>
      <h1>Debug OCR</h1>
      <div>Tests finding text data in images using browser OCR</div>
      <Grid
        key={key}
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={5}
      >
        <OCRFromCamera onSuccess={(newValue) => setValue(newValue)} />
        {value && (
          <>
            <Box mt={2}>
              Found the following text:
              <Button
                sx={{ ml: 2 }}
                variant="contained"
                onClick={() => {
                  setKey(new Date().toISOString());
                  setValue(undefined);
                }}
              >
                Reset
              </Button>
            </Box>
            <Paper
              sx={{
                mt: 1,
                mb: 3,
                p: 2,
                width: '100%',
                height: '100%',
                overflowX: 'auto',
                fontSize: '14px',
              }}
              elevation={3}
            >
              <div>
                <pre>{value}</pre>
              </div>
            </Paper>
          </>
        )}
      </Grid>
    </Container>
  );
};
