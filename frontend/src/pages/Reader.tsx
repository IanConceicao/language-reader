import { Container, Paper, Typography } from "@mui/material";
import React, { CSSProperties, useEffect, useState } from "react";
import { Popover as SelectionPopover } from "react-text-selection-popover";
import { translate } from "../util/ApiCalls";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [translation, setTranslation] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  const inputLanugage = localStorage.getItem("inputLanguage") || "Portuguese";
  const outputLanguage = localStorage.getItem("outputLanguage") || "English";

  const updateTranslation = async () => {
    if (highlightedText) {
      const response = await translate(
        inputLanugage,
        outputLanguage,
        highlightedText
      );
      setTranslation(response.data);
    } else {
      setTranslation("");
    }
  };

  const getSelectedText = () => {
    const selection = window.getSelection();
    if (selection) {
      return selection.toString();
    }
    return "";
  };

  useEffect(() => {
    updateTranslation();
  }, [highlightedText]);

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Typography variant="h4" my={2}>
          Reading text in {inputLanugage} with help in {outputLanguage}
        </Typography>
        <Paper
          elevation={4}
          sx={{ mt: 4, p: 2, "min-height": "50vh" }}
          onMouseDown={() => {
            setHighlightedText("");
            setMouseDown(true);
          }}
          onMouseUp={() => {
            setHighlightedText(getSelectedText().trim());
            setMouseDown(false);
          }}
        >
          <Typography variant="h5" ref={(el) => el !== null && setRef(el)}>
            {localStorage.getItem("text")}
          </Typography>
        </Paper>
        {ref && (
          <SelectionPopover
            target={ref}
            render={({ clientRect, isCollapsed, textContent }) => {
              if (
                !translation ||
                mouseDown === true ||
                clientRect == null ||
                isCollapsed
              )
                return null;

              const popoverStyles = {
                position: "absolute",
                left: `${clientRect.left + clientRect.width / 2}px`,
                top: `${clientRect.top - 7}px`,
                background: "white",
                borderRadius: "4px",
                filter: "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25))",
                transform: "translate(-50%, -100%)",
                userSelect: "none",
              } as CSSProperties;

              return (
                <div style={popoverStyles}>
                  <Typography sx={{ p: 1 }}>{translation}</Typography>
                </div>
              );
            }}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default Reader;
