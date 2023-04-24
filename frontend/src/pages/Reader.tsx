import { Container, Grid, Paper, PopperProps, Typography } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SelectionPopover from "../components/Reader/SelectionPopover";
import { translate } from "../util/ApiCalls";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  const [translation, setTranslation] = useState("");
  const [anchorEl, setAnchorEl] = useState<PopperProps["anchorEl"]>(null);
  const [shouldDisplayPopover, setShouldDisplayPopover] = useState(false);

  const inputLanugage = localStorage.getItem("inputLanguage") || "Portuguese";
  const outputLanguage = localStorage.getItem("outputLanguage") || "English";

  const hideTranslation = () => {
    setShouldDisplayPopover(false);
  };

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const updateTranslation = async () => {
    await delay(200);
    // Sometimes highlight is still changing.
    // This is a bit of a magic number, but it is hard to predict if it is about to change. I am not sure a better way to do this

    const selection = window.getSelection();
    if (
      !selection ||
      selection.anchorOffset === selection.focusOffset || // Empty
      !selection.toString().trim() || // Blank text
      selection.rangeCount === 0
    ) {
      return null;
    }

    let range: Range;
    try {
      // Avoid strange bug where range changes later
      range = selection.getRangeAt(0);
    } catch (e) {
      return null;
    }

    const getBoundingClientRect = () => {
      let position = range.getBoundingClientRect();
      if (!range.startContainer.textContent) {
        return position;
      }
      const char_before =
        range.startContainer.textContent[range.startOffset - 1];
      if (char_before === "\n") {
        // This hunts down a Safari bug where the rect is wrong in case of after newlines
        // create a clone of our Range so we don't mess with the visible one
        const clone = range.cloneRange();
        // check if we are experiencing a bug
        clone.setStart(range.startContainer, range.startOffset - 1);
        if (clone.getBoundingClientRect().top === position.top) {
          // make it select the next character
          clone.setStart(range.startContainer, range.startOffset + 1);
          position = clone.getBoundingClientRect();
        }
      }

      return position;
    };

    setAnchorEl({ getBoundingClientRect });

    const translation = await translate(
      inputLanugage,
      outputLanguage,
      selection.toString().trim()
    );
    setTranslation(translation);
    setShouldDisplayPopover(true);
  };

  return (
    <>
      <Navbar></Navbar>
      <div onMouseDown={hideTranslation} onMouseUp={updateTranslation}>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 10 }}>
          <Grid container alignContent="center" spacing={4} direction="column">
            <Grid item>
              <Typography
                variant="h5"
                className="disable-text-selection"
                fontFamily={"monospace"}
              >
                ✍️ Highlight any words or sentences for a translation
              </Typography>
            </Grid>
            <Grid item>
              <Paper elevation={2} sx={{ p: 2, minHeight: "50vh" }}>
                <Typography
                  variant="subtitle1"
                  style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
                >
                  {localStorage.getItem("text")}
                </Typography>
                <SelectionPopover
                  content={translation}
                  anchorEl={anchorEl}
                  display={shouldDisplayPopover}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Reader;
