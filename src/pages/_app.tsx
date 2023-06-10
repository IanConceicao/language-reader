import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import { createContext, useEffect, useMemo, useState } from "react";
import lightTheme from "@/themes/lightTheme";
import darkTheme from "@/themes/darkTheme";
import { Container } from "@mui/material";
import Navbar from "@/components/Navbar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function MyApp(props: MyAppProps) {
  useEffect(() => {
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

    setMode(getInitialMode());
  }, []);

  const [mode, setMode] = useState<"light" | "dark">("light");

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

  // If there's no emotionCache rendered by the server, use the clientSideEmotionCache
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Language Learner</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Learn a language with interactive translation and more"
        />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Container maxWidth="md" sx={{ mb: 10 }}>
            <Navbar />
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
