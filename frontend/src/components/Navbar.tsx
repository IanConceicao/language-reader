import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import {
  AppBar,
  Container,
  IconButton,
  IconButtonProps,
  Stack,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../App";

const CustomIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  transition: theme.transitions.create(["color", "transform"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
  },
}));

interface NavbarPropos {}

const Navbar: React.FC<NavbarPropos> = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Stack direction="row" justifyContent="space-between" width={"100%"}>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Language Reader
            </Typography>
            <Stack direction="row" spacing={2}>
              <CustomIconButton
                aria-label="https://github.com/IanConceicao/language-reader"
                onClick={() =>
                  window.open("https://github.com/IanConceicao/language-reader")
                }
                color="inherit"
              >
                <GitHubIcon />
              </CustomIconButton>
              <CustomIconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <LightModeIcon />
                ) : (
                  <ModeNightIcon />
                )}
              </CustomIconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
