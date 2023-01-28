import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  const [searchParams] = useSearchParams();

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Paper elevation={4} sx={{ mt: 2, p: 2, "min-height": "50vh" }}>
          <Typography variant="h5">{searchParams.get("text")}</Typography>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Reader;
