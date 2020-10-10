import { createMuiTheme } from '@material-ui/core/styles';
import { deepOrange,grey,brown } from '@material-ui/core/colors';

const pellet = createMuiTheme({
    palette: {
      primary: {
        light: grey[300],
        main: grey[600],
        dark: grey[700],
        contrastText: '#fff',
      },
      secondary: {
        light: deepOrange[400],
        main: deepOrange[600],
        dark: deepOrange[700],
        contrastText: '#000',
      },
      default: {
        light: brown[400],
        main: brown[600],
        dark: brown[700],
        contrastText: '#000',
      }
    },
  });

  export default pellet;