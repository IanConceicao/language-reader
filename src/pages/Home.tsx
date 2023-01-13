import { Typography, TextField, Box } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import TextBox from "../components/TextBox";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        On its way to being a site of a great language learning app
      </Typography>
      <TextBox></TextBox>
    </React.Fragment>
  );
};

export default Home;
