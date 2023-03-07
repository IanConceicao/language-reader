import { Container, Paper, Typography } from "@mui/material";
import React, { CSSProperties, useState } from "react";
import { Popover as SelectionPopover } from "react-text-selection-popover";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  const inputLanugage = localStorage.getItem("inputLanguage") || "Portuguese";
  const outputLanguage = localStorage.getItem("outputLanguage") || "English";

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
            setMouseDown(true);
          }}
          onMouseUp={() => {
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
              if (mouseDown === true || clientRect == null || isCollapsed)
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
                  <Typography sx={{ p: 1 }}>{textContent}</Typography>
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