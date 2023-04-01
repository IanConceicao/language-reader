import { Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectionPopover from "../components/Reader/SelectionPopover";
import { translate } from "../util/ApiCalls";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  const [translation, setTranslation] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [shouldDisplayPopover, setShouldDisplayPopover] = useState(false);

  const inputLanugage = localStorage.getItem("inputLanguage") || "Portuguese";
  const outputLanguage = localStorage.getItem("outputLanguage") || "English";

  useEffect(() => {
    // Hide popover on screen resize
    function handleResize() {
      setShouldDisplayPopover(false);
    }

    window.addEventListener("resize", handleResize);
  }, []);

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

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const updateTranslation = async () => {
    await delay(150); // Avoids highlight not being ready
    const highlightedText = getSelectedText();
    if (setHighlightRecHelper() && highlightedText) {
      // Update location, translation and display
      setScrollPosition(window.scrollY);
      const translation = await translate(
        inputLanugage,
        outputLanguage,
        highlightedText
      );
      setTranslation(translation);
      setShouldDisplayPopover(true);
    }
  };

  const setHighlightRecHelper = (): boolean => {
    // Returns true if set, false otherwise
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      return false;
    }
    const range = sel.getRangeAt(0);

    let position = range.getBoundingClientRect();
    if (!range.startContainer.textContent) {
      return false;
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
    return true;
  };

  return (
    <div onMouseDown={hideTranslation} onMouseUp={updateTranslation}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 10 }}>
        <Typography variant="h5" className="disable-text-selection">
          ✍️ Highlight any words or sentences for a translation.
        </Typography>
        <Paper elevation={4} sx={{ mt: 4, p: 2, minHeight: "50vh" }}>
          <Typography
            variant="subtitle1"
            style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
          >
            {localStorage.getItem("text")}
          </Typography>
          <SelectionPopover
            content={translation}
            baseYPos={scrollPosition}
            domRect={highlightRect}
            display={shouldDisplayPopover}
          />
        </Paper>
      </Container>
    </div>
  );
};

export default Reader;
