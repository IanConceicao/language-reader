import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../App";
import CustomIconButton from "./SlowIconButton";

interface NavbarPropos {}

const Navbar: React.FC<NavbarPropos> = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Stack
      direction="row"
      alignItems={"center"}
      sx={{ justifyContent: "space-between" }}
      pt={1}
      pb={2}
    >
      <Typography
        variant="h4"
        component="a"
        href="/"
        lineHeight={1}
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
        <Tooltip enterDelay={500} title="View this project on GitHub">
          <CustomIconButton
            aria-label="https://github.com/IanConceicao/language-reader"
            onClick={() =>
              window.open("https://github.com/IanConceicao/language-reader")
            }
            color="inherit"
          >
            <GitHubIcon />
          </CustomIconButton>
        </Tooltip>
        <Tooltip enterDelay={500} title="Toggle theme">
          <CustomIconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <LightModeIcon />
            ) : (
              <ModeNightIcon />
            )}
          </CustomIconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Navbar;
