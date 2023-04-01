import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  /**
   * TODO:
   * 1. DONE -Remember what languages the user likes for input and output
   * 2. Set default text based on the loaded language, like hello or something
   * 3. Make a class for the minwidth style (look into makeStyle?)
   **/

  const supportedLanguages = [
    "English",
    "Portuguese",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Hindi",
    "Japanese",
    "Russian",
  ];

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
        supportedLanguages.filter((elem) => elem !== e.target.value)[0]
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

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}
        marginBottom={20}
      >
        <Grid item xs={12}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              id="input-text"
              onChange={setTextHelper}
              label={`Paste your ${inputLanguage} text in here`}
              variant="outlined"
              multiline
              minRows={8}
              maxRows={20}
              value={text}
              fullWidth
              margin="normal"
              error={error}
              helperText={error ? "Enter some text" : ""}
              sx={{ backgroundColor: "white" }}
            />
          </Box>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            type="button"
            color="error"
            onClick={handleClearText}
          >
            Clear
          </Button>
        </Grid>
        <Grid item>
          <FormControl
            size="small"
            sx={{ minWidth: "10em", backgroundColor: "white" }}
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
          <Tooltip title="Swap the languages">
            <IconButton onClick={swapLanguages}>
              <ArrowForwardIcon></ArrowForwardIcon>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <FormControl
            size="small"
            sx={{ minWidth: "10em", backgroundColor: "white" }}
          >
            <InputLabel>Helper Language</InputLabel>
            <Select
              label="Reader Language"
              onChange={handleOutputLanguageSelect}
              value={outputLanguage}
              MenuProps={MenuProps}
            >
              {supportedLanguages
                .filter((elem) => elem !== inputLanguage)
                .map((language) => (
                  <MenuItem value={language} key={language}>
                    {language}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" type="button" onClick={handleSubmit}>
            Read
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default TextBox;
