import sharedTheme from "./sharedTheme";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  ...sharedTheme,
  palette: {
    background: {
      default: "#f6f8fc",
      paper: "#fafafa",
    },
    primary: {
      main: "#03A9F4",
      light: "#4FC3F7",
      dark: "#0277BD",
    },
    warning: {
      main: "#F44336",
      light: "#E57373",
      dark: "#C62828",
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#fafafa",
        },
      },
    },
  },
});
export default lightTheme;
