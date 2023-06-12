import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  DETECT_LANGUAGE,
  supportedLanguages,
} from "../../api-utils/data/supportedLanguages";
import SwapArrow from "./SwapArrow";
import { useSearchParams } from "next/navigation";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  const [text, setText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const setInitialTextAndLanguages = () => {
      const chosenInputLang =
        searchParams.get("inputLanguage") ||
        localStorage.getItem("inputLanguage") ||
        supportedLanguages[3];

      const chosenOutputLang =
        searchParams.get("outputLanguage") ||
        localStorage.getItem("outputLanguage") ||
        supportedLanguages[1];

      setOutputLanguagePersistent(chosenOutputLang);
      setInputLanguagePersistent(chosenInputLang);

      setTextPersistent(localStorage.getItem("text") || "hello");
    };

    setInitialTextAndLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setInputLanguagePersistent = (language: string) => {
    setInputLanguage(language);
    localStorage.setItem("inputLanguage", language);
  };

  const setOutputLanguagePersistent = (language: string) => {
    setOutputLanguage(language);
    localStorage.setItem("outputLanguage", language);
  };

  const setTextPersistent = (text: string) => {
    setText(text);
    localStorage.setItem("text", text);
  };

  useEffect(() => {
    // languages were somehow set to the same value
    if (inputLanguage === outputLanguage) {
      setOutputLanguagePersistent(
        supportedLanguages.filter(
          (elem) => elem !== inputLanguage && elem !== DETECT_LANGUAGE
        )[0]
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputLanguage, inputLanguage]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!text) {
      setError(true);
    } else {
      setError(false);

      router.push({
        pathname: "/reader",
        query: { inputLanguage: inputLanguage, outputLanguage: outputLanguage },
      });
    }
  };

  const handleClearText = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setTextPersistent("");
  };

  const handleInputLanguageSelect = (e: SelectChangeEvent) => {
    setInputLanguagePersistent(e.target.value);
  };

  const handleOutputLanguageSelect = (e: SelectChangeEvent) => {
    setOutputLanguagePersistent(e.target.value);
  };

  const swapLanguages = () => {
    const tempOutput = outputLanguage;
    setInputLanguagePersistent(""); // Avoid strange asynchronous changes from them ever being equal
    setOutputLanguagePersistent(inputLanguage);
    setInputLanguagePersistent(tempOutput);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "15em",
      },
    },
  };

  const setTextHelper = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value.replaceAll("\n", "\n");
    setTextPersistent(val);
  };

  const makeTextBoxLabel = (): string => {
    const language =
      inputLanguage === DETECT_LANGUAGE
        ? inputLanguage.toLowerCase()
        : inputLanguage;
    return `Text in ${language}`;
  };

  return (
    <React.Fragment>
      <Paper elevation={1} sx={{ padding: 2 }}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                id="input-text"
                onChange={setTextHelper}
                label={makeTextBoxLabel()}
                variant="outlined"
                multiline
                minRows={8}
                maxRows={20}
                value={text}
                fullWidth
                error={error}
                helperText={error ? "Enter some text" : ""}
              />
            </Box>
          </Grid>
          <Grid item>
            <Button
              // Todo: Make these buttons a styled component or some way to share their style
              variant="outlined"
              type="button"
              color="error"
              onClick={handleClearText}
              sx={{ textTransform: "none" }}
            >
              Clear
            </Button>
          </Grid>
          <Grid item>
            <FormControl
              size="small"
              sx={{
                minWidth: "10em",
              }}
            >
              <InputLabel>Text Language</InputLabel>
              <Select
                label="Text Language"
                onChange={handleInputLanguageSelect}
                value={inputLanguage}
                MenuProps={MenuProps}
              >
                {supportedLanguages.map((language) => (
                  <MenuItem value={language} key={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <SwapArrow
              currentLanguage={inputLanguage}
              onClick={swapLanguages}
            />
          </Grid>
          <Grid item>
            <FormControl
              size="small"
              sx={{
                minWidth: "10em",
              }}
            >
              <InputLabel>Helper Language</InputLabel>
              <Select
                label="Reader Language"
                onChange={handleOutputLanguageSelect}
                value={outputLanguage}
                MenuProps={MenuProps}
              >
                {supportedLanguages
                  .filter(
                    (elem) => elem !== inputLanguage && elem !== DETECT_LANGUAGE
                  )
                  .map((language) => (
                    <MenuItem value={language} key={language}>
                      {language}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              type="button"
              onClick={handleSubmit}
              sx={{ textTransform: "none" }}
            >
              Read
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default TextBox;
