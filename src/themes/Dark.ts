import { createTheme } from '@mui/material';
import { cyan, deepPurple, purple } from '@mui/material/colors';

export const DarkTheme = createTheme({

   palette  : {
    mode: 'dark',
    primary : {
        main: '#F2A710',
        dark: '#7942ff',
        light: '#9c73ff',

        contrastText: '#ffffff',
    },

    secondary : {
        main: cyan[500],
        dark: cyan[400],
        light: cyan[300],

        contrastText: '#ffffff',
    },
    background: {
        default: '#202124',
        paper:          '#303134'       
    },
   },

   typography: {
    allVariants: {
        color: 'white',
    }
   }

});