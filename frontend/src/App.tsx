import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./pages/Home";
import Lost from "./pages/Lost";
import Reader from "./pages/Reader";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { pingBackend } from "./util/ApiCalls";

// Instructions on how to incorporate light and dark here: https://stackoverflow.com/questions/59145165/change-root-background-color-with-material-ui-theme
// More instructions: https://stackoverflow.com/questions/60424596/cant-customize-color-palette-types-on-material-ui-theme-in-typescript

const lightTheme = createTheme({
  palette: {
    background: {
      default: "#fafafa",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#272727",
    },
  },
});

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App: React.FC = () => {
  useEffect(() => {
    pingBackend();
  }, []);

  const getInitialMode = (): "light" | "dark" => {
    if (
      window.matchMedia("(prefers-color-scheme: dark)").matches ||
      localStorage.getItem("theme") === "dark"
    ) {
      return "dark";
    } else {
      return "light";
    }
  };

  const [mode, setMode] = useState<"light" | "dark">(() => getInitialMode());

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/reader" element={<Reader />}></Route>
            <Route path="*" element={<Lost />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
