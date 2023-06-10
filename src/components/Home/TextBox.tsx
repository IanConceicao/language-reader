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
import React, {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import {
  DETECT_LANGUAGE,
  supportedLanguages,
} from "../../data/supportedLanguages";
import SwapArrow from "./swapArrow";
import { useSearchParams } from "next/navigation";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  const [text, setText] = useState("");
  const [inputLanguage, setInputLanguage] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const setInitialTextAndLanguages = () => {
      setInputLanguage(
        searchParams.get("inputLanguage") ||
          sessionStorage.getItem("inputLanguage") ||
          supportedLanguages[0]
      );

      setOutputLanguage(
        searchParams.get("outputLanguage") ||
          sessionStorage.getItem("outputLanguage") ||
          supportedLanguages[1]
      );

      setText(sessionStorage.getItem("text") || "hello");
    };

    setInitialTextAndLanguages();
  });

  const router = useRouter();

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
    setText("");
  };

  const handleInputLanguageSelect = (e: SelectChangeEvent) => {
    setInputLanguage(e.target.value);
    sessionStorage.setItem("inputLanguage", e.target.value);

    if (e.target.value === outputLanguage) {
      const newOutputLang: string = supportedLanguages.filter(
        (elem) => elem !== e.target.value && elem !== DETECT_LANGUAGE
      )[0];
      setOutputLanguage(newOutputLang);
      sessionStorage.setItem("outputLanguage", newOutputLang);
    }
  };

  const handleOutputLanguageSelect = (e: SelectChangeEvent) => {
    setOutputLanguage(e.target.value);
    sessionStorage.setItem("outputLanguage", e.target.value);
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
    const val = e.target.value.replaceAll("\n", "\n");
    setText(val);
    sessionStorage.setItem("text", val);
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
