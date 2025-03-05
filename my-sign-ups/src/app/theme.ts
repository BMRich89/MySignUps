'use client';
import { cyan } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: cyan[500],
      },
      secondary: {
        main: '#36454F',
      },
    },
  });
  

export default theme;