import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#14161B',
      main: '#1C1D24',
      dark: '#14161B',
      A100: '#B0B7CB',
      contrastText: '#C38FFF',
    },
    text: {
      primary: '#B0B7CB',
      secondary: '#757E8E',
      accent: '#F50057',
    },
  },
});

export default theme;
