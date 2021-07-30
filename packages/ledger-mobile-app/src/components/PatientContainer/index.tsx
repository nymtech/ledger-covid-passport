import * as React from 'react';
import { Box, Container } from '@material-ui/core';
import { AppModeSwitcher } from '../AppModeSwitcher';
import { lime } from '@material-ui/core/colors';

export const PatientContainer: React.FC = ({ children }) => (
  <Container>
    <Box
      sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '600px' }}
    >
      <Box sx={{ p: 4 }}>{children}</Box>
    </Box>
    <Box
      sx={{
        background: lime.A200,
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
        End user view <AppModeSwitcher />
      </h1>
      <div>
        <p>
          Cillum nulla exercitation nulla proident incididunt dolore dolore
          laborum sunt irure laboris duis. In voluptate amet excepteur voluptate
          consequat dolore et elit pariatur tempor anim ullamco minim labore
          consequat. Consectetur deserunt ipsum nostrud aute cupidatat pariatur
          id officia voluptate velit sit enim laboris pariatur sit. Eu aliquip
          officia adipisicing ut eiusmod laborum deserunt nostrud ullamco aute
          occaecat officia nostrud. Minim in minim laborum eiusmod tempor tempor
          et in anim. Velit veniam culpa non ad dolor sit eiusmod sit elit
          labore. Exercitation aliqua anim fugiat sunt consectetur occaecat enim
          duis laboris elit id reprehenderit pariatur.
        </p>
        <p>
          Non ut ipsum sint velit magna aute laboris amet velit mollit sit nulla
          ullamco. Dolore excepteur commodo velit aliquip quis nostrud
          adipisicing cillum exercitation nostrud. Proident ullamco cupidatat
          veniam occaecat laboris excepteur mollit consequat ad commodo ad anim
          labore nulla est exercitation. Tempor Lorem nisi aliqua ipsum eiusmod
          elit reprehenderit sit qui commodo proident ullamco reprehenderit
          excepteur aliqua ipsum culpa. Ex nostrud enim do occaecat ullamco
          magna ullamco ea deserunt tempor consectetur officia ipsum est. Irure
          laboris reprehenderit qui labore Lorem ipsum ipsum pariatur in. Aliqua
          mollit nostrud labore consequat ipsum sit magna anim consequat id sit
          esse reprehenderit dolore aliquip dolore qui. Qui ipsum esse ea est eu
          est anim magna culpa.
        </p>
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
