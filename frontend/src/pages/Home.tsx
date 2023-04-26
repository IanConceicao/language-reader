import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import TextBox from "../components/Home/TextBox";
import Navbar from "../components/Navbar";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth="lg" sx={{ mt: 1, mb: 10 }}>
        <Stack alignContent="center" spacing={4} direction="column">
          <Stack alignItems="center" direction="row" spacing={2}>
            <KeyboardDoubleArrowRightOutlinedIcon />
            <Typography
              variant="h5"
              className="disable-text-selection"
              fontFamily={"monospace"}
            >
              Type or copy in text
            </Typography>
          </Stack>
          <TextBox></TextBox>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
