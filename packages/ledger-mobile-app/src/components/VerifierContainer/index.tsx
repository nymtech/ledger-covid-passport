import * as React from 'react';
import { Box, Container } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { AppModeSwitcher } from '../AppModeSwitcher';

export const VerifierContainer: React.FC = ({ children }) => (
  <Container>
    <Box
      sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '600px' }}
    >
      <Box sx={{ p: 4 }}>{children}</Box>
    </Box>
    <Box
      sx={{
        bgcolor: teal.A200,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 'calc(100vw - 600px)',
        overflowY: 'auto',
        py: 2,
        px: 4,
      }}
    >
      <h1>
        Verifier view <AppModeSwitcher />
      </h1>
      <div>
        <p>
          Minim ex deserunt incididunt nostrud incididunt veniam veniam occaecat
          proident dolore et laboris. Culpa aute enim irure elit commodo mollit
          elit ipsum quis anim fugiat sit quis. Esse sint laborum exercitation
          consectetur aliqua nostrud et mollit eiusmod eu excepteur mollit
          adipisicing velit. Officia velit proident irure qui culpa cillum
          veniam. Ipsum esse pariatur excepteur proident deserunt elit dolor
          enim adipisicing adipisicing proident proident aute voluptate
          pariatur. Occaecat elit eiusmod ea ipsum exercitation ipsum velit
          veniam cupidatat amet laborum consectetur adipisicing. Adipisicing
          aliqua et consectetur nisi reprehenderit laborum nulla do. Fugiat
          aliqua occaecat amet aliquip do do minim cillum ullamco minim anim.
        </p>
        <p>
          Eiusmod magna ex cupidatat occaecat proident aliqua ullamco cupidatat
          anim. Aliquip ullamco ullamco incididunt do aliqua cillum duis
          deserunt exercitation ea sit ex non id tempor exercitation laboris.
          Labore anim nostrud qui velit aute excepteur ad est tempor nostrud
          cupidatat anim.
        </p>
      </div>
    </Box>
  </Container>
);
