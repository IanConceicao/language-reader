import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import TextBox from "../components/Home/TextBox";
import Navbar from "../components/Navbar";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 10 }}>
        <Grid container alignContent="center" spacing={4} direction="column">
          <Grid item>
            <Typography
              variant="h5"
              className="disable-text-selection"
              fontFamily={"monospace"}
            >
              ⌨️ Type or copy in text
            </Typography>
          </Grid>
          <Grid item width={"100%"}>
            <TextBox></TextBox>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
