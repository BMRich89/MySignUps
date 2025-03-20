'use client';
import { cyan } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#A6C9BC',
      main: '#7DAF9C',
      dark: '#67A28C',
      contrastText: '#273F36',
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
},components: {
  MuiTextField: {
    defaultProps: {
      variant: "filled", // Sets 'filled' as the default variant globally
    }
  }
}
});
  //secondary bg color #5B7B7A

export default theme;