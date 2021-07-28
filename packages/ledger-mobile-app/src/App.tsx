import * as React from 'react';
import {
  Alert,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Container,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { mainListItems, secondaryListItems } from './listItems';
import { CenteredGrid } from './components/GridExample';
import { StyledExample } from './components/StyledExample';
import { DialogExample } from './components/DialogExample';

export const App: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Container sx={{ pb: 10 }}>
      <Drawer variant="permanent" open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>

      <h1>Material!</h1>

      <h2>Buttons</h2>
      <Button sx={{ mr: 2 }} color="primary">
        Primary
      </Button>
      <Button sx={{ mr: 2 }} variant="contained">
        Contained
      </Button>
      <Button sx={{ mr: 2 }} variant="outlined">
        Outlined
      </Button>

      <h2>Alerts</h2>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>

      <h2>Grids</h2>
      <CenteredGrid />

      <h2>
        <code>styled</code>
      </h2>
      <StyledExample />

      <h2>Dialogs</h2>
      <DialogExample />
    </Container>
  );
};
