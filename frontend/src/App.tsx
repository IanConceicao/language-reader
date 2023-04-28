import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import {
  Container,
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import Home from "./pages/Home";
import Lost from "./pages/Lost";
import Reader from "./pages/Reader";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navbar from "./components/Navbar";
import { pingBackend } from "./util/ApiCalls";

const sharedTheme: ThemeOptions = { shape: { borderRadius: 12 } };

const lightTheme = createTheme({
  ...sharedTheme,
  palette: {
    background: {
      default: "#f6f8fc",
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
});

const darkTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: "dark",
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
        <Container maxWidth="md" sx={{ mb: 10 }}>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/reader" element={<Reader />}></Route>
              <Route path="*" element={<Lost />}></Route>
            </Routes>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
