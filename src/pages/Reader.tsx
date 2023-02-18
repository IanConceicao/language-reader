import {
  Button,
  Container,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  PopperProps,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { useSearchParams } from "react-router-dom";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ mt: 4, p: 2, "min-height": "50vh" }}>
          <Typography variant="h5">{localStorage.getItem("text")}</Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Reader;
