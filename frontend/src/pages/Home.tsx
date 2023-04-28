import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Stack, Typography } from "@mui/material";
import React from "react";
import TextBox from "../components/Home/TextBox";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Stack spacing={3} direction="column">
      <Stack alignItems="center" direction="row" spacing={2}>
        <KeyboardDoubleArrowRightOutlinedIcon />
        <Typography
          variant="h6"
          className="disable-text-selection"
          fontFamily={"monospace"}
        >
          Type or paste your text below
        </Typography>
      </Stack>
      <TextBox></TextBox>
    </Stack>
  );
};

export default Home;
