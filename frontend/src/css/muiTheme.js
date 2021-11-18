import { createTheme } from '@mui/material';

const muiTheme = createTheme({
  typography: {
    fontFamily: 'SBAggroL',
  },
  palette: {
    primary: {
      main: '#2195F2',
      light: '#ffe54c',
      dark: '#0068BF',
      contrastText: '#212121',
    },
  },
});

export default muiTheme;
