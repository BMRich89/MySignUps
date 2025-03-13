'use client';
import { cyan } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#84b3b1',
      main: '#a34514',
      dark: '#344747',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#eb9d73',
      main: '#ce8964',
      dark: '#664331',
      contrastText: '#FFF',
    },
    background: {
      default: "#1D1E2C",
      paper: "#FFD447",
    },
    text: {
      primary: "#361134",
      secondary: "#AB3428"
  }
}
});
  //secondary bg color #5B7B7A

export default theme;