import React, { useEffect } from "react";
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
const customTheme = createTheme({
  palette: {
    background: {
      default: "#fafafa",
    },
  },
});

const App: React.FC = () => {
  useEffect(() => {
    pingBackend();
  }, []);
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/reader" element={<Reader />}></Route>
          <Route path="*" element={<Lost />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
