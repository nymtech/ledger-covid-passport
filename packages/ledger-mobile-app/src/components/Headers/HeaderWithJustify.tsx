import { styled } from '@material-ui/core/styles';

export const HeaderWithJustify = styled('h1')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));
