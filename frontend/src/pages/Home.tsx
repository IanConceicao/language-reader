import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Stack, Typography } from "@mui/material";
import React from "react";
import TextBox from "../components/Home/TextBox";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Stack spacing={4} direction="column">
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
    </>
  );
};

export default Home;
