import { Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectionPopover from "../components/Reader/SelectionPopover";
import { translate } from "../util/ApiCalls";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  const [translation, setTranslation] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [highlightRect, setHighlightRect] = useState<ClientRect | null>(null);
  const [shouldDisplayPopover, setShouldDisplayPopover] = useState(false);

  const inputLanugage = localStorage.getItem("inputLanguage") || "Portuguese";
  const outputLanguage = localStorage.getItem("outputLanguage") || "English";

  const getSelectedText = () => {
    const selection = window.getSelection();
    if (selection) {
      return selection.toString().trim();
    }
    return "";
  };

  const hideTranslation = () => {
    setShouldDisplayPopover(false);
  };

  const updateTranslation = async () => {
    const highlightedText = getSelectedText();
    if (highlightedText) {
      setTranslation("");
      setScrollPosition(window.scrollY);
      setHighlightRecHelper();
      const translation = await translate(
        inputLanugage,
        outputLanguage,
        highlightedText
      );
      setTranslation(translation);
      setShouldDisplayPopover(true);
    }
  };

  const setHighlightRecHelper = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      return;
    }
    const range = sel.getRangeAt(0);

    let position = range.getBoundingClientRect();
    if (!range.startContainer.textContent) {
      return;
    }
    const char_before = range.startContainer.textContent[range.startOffset - 1];
    if (char_before === "\n") {
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
    setHighlightRect(position);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 10 }}>
      <Typography variant="h5">
        ✍️ Highlight any text for a translation.
      </Typography>
      <Paper
        elevation={4}
        sx={{ mt: 4, p: 2, minHeight: "50vh" }}
        onMouseDown={hideTranslation}
        onMouseUp={updateTranslation}
      >
        <Typography
          variant="subtitle1"
          style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
        >
          {localStorage.getItem("text")}
        </Typography>
        <SelectionPopover
          content={translation}
          baseYPos={scrollPosition}
          customClientRect={highlightRect}
          display={shouldDisplayPopover}
        />
      </Paper>
    </Container>
  );
};

export default Reader;
