import { Box, Button, Container, TextField } from "@mui/material";
import { Component, useState } from "react";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  const [text, setText] = useState("olá");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!text) {
      setError(true);
    } else {
      setError(false);
      console.log(text);
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
      <Button
        variant="contained"
        type="submit"
        onClick={() => console.log("you clicked me!")}
      >
        Translate
      </Button>
    </Box>
  );
};

export default TextBox;
