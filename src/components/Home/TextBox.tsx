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
import React, { Component, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  const [text, setText] = useState("olá");
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState("Portuguese");

  const supportedLanguages = ["English", "Portuguese", "Spanish"];

  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!text) {
      setError(true);
    } else {
      setError(false);

      navigate({
        pathname: "/reader",
        search: createSearchParams({
          text: text,
          language: language,
        }).toString(),
      });
    }
  };

  const handleLanguageSelect = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="input-text"
              onChange={(e) => setText(e.target.value)}
              label={`Paste your ${language} text in here`}
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
        <Grid item xs={12} alignItems="center" alignContent="center">
          <FormControl size="small">
            <InputLabel>Text Language</InputLabel>
            <Select
              label="Text Language"
              onChange={handleLanguageSelect}
              value={language}
            >
              {supportedLanguages.map((language) => (
                <MenuItem value={language}>{language}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" type="button" onClick={handleSubmit}>
            Translate
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TextBox;
