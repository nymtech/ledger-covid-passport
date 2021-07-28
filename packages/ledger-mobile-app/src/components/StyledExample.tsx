import { styled } from '@material-ui/styles';
import React from 'react';
import { Theme } from '@material-ui/core/styles';

const MyBrownComponent = styled('span')({
  backgroundColor: 'brown',
  margin: '1rem',
  padding: '1rem',
});

const MyPrimaryComponent = styled('span')((props) => ({
  backgroundColor: (props.theme as Theme).palette.primary.main,
  margin: (props.theme as Theme).spacing(2),
  padding: (props.theme as Theme).spacing(2),
}));

export const StyledExample: React.FC = () => (
  <div>
    <MyBrownComponent>This is a brown component</MyBrownComponent>
    <MyPrimaryComponent>This is a primary component</MyPrimaryComponent>
  </div>
);
