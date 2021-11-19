import { createTheme } from '@mui/material';
import { mainTheme } from './theme';

const muiTheme = createTheme({
  typography: {
    fontFamily: 'SBAggroL',
  },
  palette: {
    primary: {
      main: mainTheme.colors.blueM,
      light: mainTheme.colors.blueL,
      dark: mainTheme.colors.blueD,
      contrastText: mainTheme.colors.black900,
    },
  },
});

export default muiTheme;

export const selectTheme = createTheme({
  typography: {
    fontFamily: 'SBAggroL',
    fontSize: 12,
  },
});
