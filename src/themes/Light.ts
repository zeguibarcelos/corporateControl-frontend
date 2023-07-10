import { createTheme } from '@mui/material';
import { cyan, deepPurple } from '@mui/material/colors';

export const LightTheme = createTheme({

   palette  : {
    primary : {
        main: "#F2A710",
        dark: deepPurple[800],
        light: deepPurple[500],

        contrastText: '#000000',
    },

    secondary : {
        main: cyan[500],
        dark: cyan[400],
        light: cyan[300],

        contrastText: '#000000',
    },
    background: {
        default: '#f1f0f5',
        paper: '#ffffff',
    }

   }

});