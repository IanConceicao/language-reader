import { Box, Button, Container, TextField } from "@mui/material";
import { Component, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  const [text, setText] = useState("olá");
  const [error, setError] = useState(false);

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
          language: "en",
        }).toString(),
      });
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="input-text"
        onChange={(e) => setText(e.target.value)}
        label="Input Your Portuguese Text Here"
        variant="outlined"
        multiline
        rows={4}
        defaultValue={text}
        fullWidth
        margin="normal"
        error={error}
        helperText={error ? "Enter some text" : ""}
      />
      <Button variant="contained" type="submit">
        Translate
      </Button>
    </Box>
  );
};

export default TextBox;
