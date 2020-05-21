import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#14161B",
      main: "#1C1D24",
      dark: "#14161B",
      A100: "#C38FFF",
      contrastText: "#C38FFF",
    },
    text: {
      primary: "#b0b7cb",
      secondary: "#757e8e",
    },
  },
});

export default theme;
