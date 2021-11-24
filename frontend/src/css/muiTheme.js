import { createTheme } from '@mui/material';
import { mainTheme } from './theme';

const wantPx = (px) => {
  return (px / 16) * 14;
};

const muiTheme = createTheme({
  typography: {
    fontFamily: 'SBAggroL',
  },
  palette: {
    primary: {
      main: mainTheme.colors.blueM,
      light: mainTheme.colors.blueL,
      dark: mainTheme.colors.blueD,
    },
    secondary: {
      main: mainTheme.colors.kakaocolor,
    },
  },
});

export default muiTheme;

export const selectTheme = createTheme({
  typography: {
    fontFamily: 'SBAggroL',
    fontSize: wantPx(14),
    button: {
      fontSize: '1rem',
    },
  },
});
