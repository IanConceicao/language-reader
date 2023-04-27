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
import { useNavigate } from "react-router-dom";
import {
  DETECT_LANGUAGE,
  supportedLanguages,
} from "../../data/SupportedLanguages";
import SwapArrow from "./SwapArrow";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  const [text, setText] = useState(localStorage.getItem("text") || "");
  const [inputLanguage, setInputLanguage] = useState(
    localStorage.getItem("inputLanguage") || supportedLanguages[0]
  );
  const [outputLanguage, setOutputLanguage] = useState(
    localStorage.getItem("outputLanguage") || supportedLanguages[1]
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem("inputLanguage", inputLanguage);
  }, [inputLanguage]);

  useEffect(() => {
    localStorage.setItem("outputLanguage", outputLanguage);
  }, [outputLanguage]);

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!text) {
      setError(true);
    } else {
      setError(false);

      navigate({
        pathname: "/reader",
        search: `?inputLanguage=${inputLanguage}&outputLanguage=${outputLanguage}`,
      });
    }
  };

  const handleClearText = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setText("");
  };

  const handleInputLanguageSelect = (e: SelectChangeEvent) => {
    setInputLanguage(e.target.value);

    if (e.target.value === outputLanguage) {
      setOutputLanguage(
        supportedLanguages.filter(
          (elem) => elem !== e.target.value && elem !== DETECT_LANGUAGE
        )[0]
      );
    }
  };

  const handleOutputLanguageSelect = (e: SelectChangeEvent) => {
    setOutputLanguage(e.target.value);
  };

  const swapLanguages = () => {
    const temp = inputLanguage;
    setInputLanguage(outputLanguage);
    setOutputLanguage(temp);
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
    const val = e.target.value;
    setText(val.replaceAll("\n", "\n"));
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
      <Paper elevation={2} sx={{ padding: 2 }}>
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
