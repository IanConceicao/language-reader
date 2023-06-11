import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Stack, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import CustomIconButton from "./slowIconButton";
import { ColorModeContext } from "@/pages/_app";

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
      mb={1}
    >
      <Typography
        variant="h4"
        component="a"
        href="/"
        lineHeight={1}
        fontFamily={"courier, monospace"}
        letterSpacing={"0.3rem"}
        fontWeight={700}
        color="inherit"
        sx={{
          textDecoration: "none",
        }}
        maxWidth={"66%"}
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
