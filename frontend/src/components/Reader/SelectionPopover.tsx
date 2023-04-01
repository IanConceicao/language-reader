import { CircularProgress, Grow, Typography } from "@mui/material";
import { CSSProperties, FunctionComponent, useEffect, useState } from "react";

interface SelectionPopoverProps {
  content: string;
  baseYPos: number;
  domRect?: DOMRect | null;
  display: boolean;
}

const SelectionPopover: FunctionComponent<SelectionPopoverProps> = (
  props: SelectionPopoverProps
) => {
  const { content, baseYPos, domRect: customClientRect, display } = props;

  const [popoverStyles, setPopoverStyles] = useState<CSSProperties>({});

  useEffect(() => {
    if (customClientRect) {
      setPopoverStyles({
        willChange: "transform", //Needed for Safari browser to correctly update
        position: "absolute",
        left: `${customClientRect.left + customClientRect.width / 2}px`,
        top: `${baseYPos + customClientRect.top - 7}px`,
        background: "white",
        borderRadius: "4px",
        filter: "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25))",
        transform: "translate(-50%, -100%)",
        userSelect: "none",
      });
    }
  }, [customClientRect, baseYPos]);

  const Popover = (
    <div style={popoverStyles}>
      <Typography sx={{ p: 1 }}>
        {content ? content : <CircularProgress size="1rem" />}
      </Typography>
    </div>
  );
  // Currently doesn't support fade out. I think I need to do prop forwarding for that
  // See: https://mui.com/material-ui/transitions/

  return (
    <Grow
      in={display}
      style={{ transformOrigin: "0 0 0" }}
      {...(display ? { timeout: 400 } : {})}
      unmountOnExit
    >
      {Popover}
    </Grow>
  );
};

export default SelectionPopover;
