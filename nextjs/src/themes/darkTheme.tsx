import sharedTheme from "./sharedTheme";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: "dark",
  },
});
export default darkTheme;
