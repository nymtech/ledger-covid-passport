import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SettingsInputComponentIcon />
      </ListItemIcon>
      <ListItemText primary="Mixnodes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <WifiTetheringIcon />
      </ListItemIcon>
      <ListItemText primary="Gateays" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Other stuff</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Top 25 mixnodes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Top rewards" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Traffic statistics" />
    </ListItem>
  </div>
);
