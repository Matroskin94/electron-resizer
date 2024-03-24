import { Paper, styled } from '@mui/material';

export const ButtonContainer = styled(Paper)(() => ({
  display: 'flex',
  padding: '16px',
  width: '200px',
  height: '100px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}));
