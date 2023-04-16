import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../App";

interface NavbarPropos {}

const Navbar: React.FC<NavbarPropos> = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* TODO Add icon on the left and dark mode switch on right. Read here about how to add color modes using contexhere
            https://mui.com/material-ui/customization/dark-mode/
            */}
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
