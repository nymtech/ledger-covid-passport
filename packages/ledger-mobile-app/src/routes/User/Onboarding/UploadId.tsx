import * as React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { styled } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { routes } from '../../../Routes';
import { useIsMounted } from '../../../hooks/useIsMounted';

const ImgPreview = styled('img')(({ theme }) => ({
  width: '100%',
}));

export const UploadId: React.FC = () => {
  const [imageDataUri, setImageDataUri] = React.useState<string>();
  const isMounted = useIsMounted();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      mt={5}
      px={4}
    >
      {!imageDataUri && (
        <>
          <Typography mt={4} textAlign="center">
            Please take an image of your document
          </Typography>
          <Box mt={2} className="nym-camera">
            <Camera
              isFullscreen={false}
              idealFacingMode="environment"
              onTakePhoto={(dataUri) => {
                if (isMounted()) {
                  setImageDataUri(dataUri);
                }
              }}
            />
          </Box>
        </>
      )}
      {imageDataUri && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={5}
        >
          <Typography mt={4} textAlign="center">
            Please make sure the document is not blurred and is completely
            visible
          </Typography>
          <Paper elevation={3} sx={{ mt: 1, p: 2 }}>
            <ImgPreview src={imageDataUri} />
          </Paper>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            mx={2}
            mt={2}
          >
            <Button
              variant="text"
              onClick={() => {
                if (isMounted()) {
                  setImageDataUri(undefined);
                }
              }}
            >
              <KeyboardArrowLeftIcon /> Try again{' '}
              <DeleteForeverOutlinedIcon sx={{ ml: 1 }} />
            </Button>
            <Button
              variant="contained"
              to={routes.user.onboarding.onboardingUploadWait}
              component={Link}
            >
              Upload image <KeyboardArrowRightIcon />
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
