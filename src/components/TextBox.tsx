import { Box, Container, TextField } from "@mui/material";
import * as React from "react";
import { Component } from "react";

interface TextBoxProps {}

const TextBox: React.FC<TextBoxProps> = () => {
  return (
    <Container maxWidth={false}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="input-text"
          label="Input Your Portuguese Text Here"
          variant="outlined"
          multiline
          rows={4}
          defaultValue="Olá"
        />
      </Box>
    </Container>
  );
};

export default TextBox;
