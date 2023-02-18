import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  /**
   * TODO:
   * 1. DONE -Remember what languages the user likes for input and output
   * 2. Set default text based on the loaded language, like hello or something
   * 3. Make a class for the minwidth style (look into makeStyle?)
   **/

  const supportedLanguages = ["English", "Portuguese", "Spanish", "French"];

  const [text, setText] = useState(localStorage.getItem("text") || "");
  const [inputLanguage, setInputLanguage] = useState(
    localStorage.getItem("inputLanguage") || "Portuguese"
  );
  const [outputLanguage, setOutputLanguage] = useState(
    localStorage.getItem("outputLanguage") || "English"
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem("text", text);
    localStorage.setItem("inputLanguage", inputLanguage);
    localStorage.setItem("outputLanguage", outputLanguage);
  }, [text, inputLanguage, outputLanguage]);

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!text) {
      setError(true);
    } else {
      setError(false);

      navigate({
        pathname: "/reader",
        // search: createSearchParams({
        //   text: text,
        //   inputLanguage: inputLanguage,
        // }).toString(),
        // No longer using search params
      });
    }
  };

  const handleInputLanguageSelect = (e: SelectChangeEvent) => {
    setInputLanguage(e.target.value);
  };

  const handleOutputLanguageSelect = (e: SelectChangeEvent) => {
    setOutputLanguage(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="input-text"
              onChange={(e) => setText(e.target.value)}
              label={`Paste your ${inputLanguage} text in here`}
              variant="outlined"
              multiline
              rows={4}
              defaultValue={text}
              fullWidth
              margin="normal"
              error={error}
              helperText={error ? "Enter some text" : ""}
            />
          </Box>
        </Grid>
        <Grid item>
          <FormControl size="small" sx={{ minWidth: "10em" }}>
            <InputLabel>Text Language</InputLabel>
            <Select
              label="Text Language"
              onChange={handleInputLanguageSelect}
              value={inputLanguage}
            >
              {supportedLanguages.map((language) => (
                <MenuItem value={language}>{language}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <ArrowForwardIcon></ArrowForwardIcon>
        </Grid>
        <Grid item>
          <FormControl size="small" sx={{ minWidth: "10em" }}>
            <InputLabel>Reader Language</InputLabel>
            <Select
              label="Reader Language"
              onChange={handleOutputLanguageSelect}
              value={outputLanguage}
            >
              {supportedLanguages.map((language) => (
                <MenuItem value={language}>{language}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button variant="contained" type="button" onClick={handleSubmit}>
            Go
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TextBox;
