import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { OCRFromCamera } from '../OCRFromCamera';
import imageEULicense from '../../data/norway_driving_licence_front.jpeg';
import imageUKLicense from '../../data/uk_driving_licence.jpeg';
import imageNLPassport from '../../data/nl-passport.png';
import imageUKPassport from '../../data/uk-passport.jpeg';
import imageUKPassport2 from '../../data/uk-passport-2.jpeg';
import {
  MRZFields,
  MRZResult,
  parseMachineReadableZone,
  parseMachineReadableZoneIntoFields,
} from '../OCRFromCamera/parseMachineReadableZone';

export const DebugOCRStatic: React.FC = () => {
  const [key, setKey] = React.useState(new Date().toISOString());
  const onReset = () => setKey(new Date().toISOString());
  return (
    <Container>
      <h1>Debug OCR with static images</h1>
      <div>
        Tests finding text data in images using browser OCR with static images
      </div>
      <Grid
        key={key}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={5}
      >
        <Box sx={{ pb: 2, mb: 5 }}>
          <h3>EU Drivers License</h3>
          <DebugOCRStaticImage imageUri={imageEULicense} onReset={onReset} />
        </Box>
        <Box sx={{ pb: 2, mb: 5 }}>
          <h3>UK Drivers License</h3>
          <DebugOCRStaticImage imageUri={imageUKLicense} onReset={onReset} />
        </Box>
        <Box sx={{ pb: 2, mb: 5 }}>
          <h3>EU Passport</h3>
          <DebugOCRStaticImage imageUri={imageNLPassport} onReset={onReset} />
        </Box>
        <Box sx={{ pb: 2, mb: 5 }}>
          <h3>UK Passport</h3>
          <DebugOCRStaticImage imageUri={imageUKPassport} onReset={onReset} />
          <DebugOCRStaticImage imageUri={imageUKPassport2} onReset={onReset} />
        </Box>
      </Grid>
    </Container>
  );
};

interface DebugOCRStaticImageProps {
  imageUri: string;
  onReset: () => void;
}

const DebugOCRStaticImage: React.FC<DebugOCRStaticImageProps> = ({
  imageUri,
  onReset,
}) => {
  const [value, setValue] = React.useState<string>();
  const [fields, setFields] = React.useState<MRZFields | null | undefined>();
  const [rawFields, setRawFields] = React.useState<MRZResult>();

  return (
    <Box mb={2}>
      <OCRFromCamera
        staticImageUri={imageUri}
        onSuccess={(newValue) => {
          setValue(newValue);
          setFields(parseMachineReadableZoneIntoFields(newValue.split('\n')));
          setRawFields(parseMachineReadableZone(newValue.split('\n')));
        }}
      />
      {value && (
        <>
          <Box mt={2}>
            Found the following text:
            <Button sx={{ ml: 2 }} variant="contained" onClick={onReset}>
              Reset
            </Button>
          </Box>
          <Paper
            sx={{
              mt: 1,
              mb: 3,
              p: 2,
            }}
            elevation={3}
          >
            <Box
              sx={{
                maxWidth: '80vw',
                height: '100%',
                overflowX: 'auto',
                fontSize: '14px',
              }}
            >
              <pre>{value}</pre>
            </Box>
            {fields && (
              <>
                <hr />
                <h4>Details parsed from Machine Readable Zone (MRZ):</h4>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Family name
                      </TableCell>
                      <TableCell>{fields.familyName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Given name
                      </TableCell>
                      <TableCell>{fields.givenName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Date of birth
                      </TableCell>
                      <TableCell>
                        {fields.dateOfBirth.toFormat('dd MMM yyyy')}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )}
            {rawFields?.valid && (
              <>
                <Box mt={2}>
                  <h4>Parsed MRZ fields</h4>
                </Box>
                <Accordion sx={{ mt: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>All fields</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        maxWidth: '80vw',
                        height: '100%',
                        overflowX: 'auto',
                        fontSize: '14px',
                      }}
                    >
                      <pre>{JSON.stringify(rawFields, null, 2)}</pre>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </>
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};
