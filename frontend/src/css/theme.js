import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Elice Digital Baeum', sans-serif",
  },
  palette: {
    primary: {
      main: "#2195F2",
      light: "#ffe54c",
      dark: "#0068BF",
      contrastText: "#212121",
    },
  },
});

export default theme;
