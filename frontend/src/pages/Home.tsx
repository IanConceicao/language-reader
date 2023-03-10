import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import TextBox from "../components/Home/TextBox";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="h4" my={2}>
              On its way to being the site of a great language learning app
            </Typography>
          </Grid>
        </Grid>
        <TextBox></TextBox>
      </Container>
    </React.Fragment>
  );
};

export default Home;
