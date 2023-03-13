import { Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectionPopover from "../components/Reader/SelectionPopover";
import { translate } from "../util/ApiCalls";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  const [paragraphRef, setParagraphRef] = useState<HTMLElement | undefined>(
    undefined
  );
  const [translation, setTranslation] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  const inputLanugage = localStorage.getItem("inputLanguage") || "Portuguese";
  const outputLanguage = localStorage.getItem("outputLanguage") || "English";

  const getSelectedText = () => {
    const selection = window.getSelection();
    if (selection) {
      return selection.toString().trim();
    }
    return "";
  };

  const clearTranslation = () => {
    setTranslation("");
  };

  const updateTranslation = async () => {
    const highlightedText = getSelectedText();
    if (highlightedText) {
      const translation = await translate(
        inputLanugage,
        outputLanguage,
        highlightedText
      );
      setTranslation(translation);
      setScrollPosition(window.scrollY);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Typography variant="h4" my={2}>
          Reading text in {inputLanugage} with help in {outputLanguage}
        </Typography>
        <Paper
          elevation={4}
          sx={{ my: 4, p: 2, "min-height": "50vh" }}
          onMouseDown={clearTranslation}
          onMouseUp={updateTranslation}
        >
          <Typography
            variant="subtitle1"
            ref={(el) => el !== null && setParagraphRef(el)}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {localStorage.getItem("text")}
          </Typography>
          <SelectionPopover
            content={translation}
            baseYPos={scrollPosition}
            target={paragraphRef}
          />
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Reader;
