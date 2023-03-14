import { Typography } from "@mui/material";
import { CSSProperties, FunctionComponent } from "react";
import { Popover } from "react-text-selection-popover";

interface SelectionPopoverProps {
  content: string;
  baseYPos: number;
  target?: HTMLElement;
  customClientRect?: ClientRect | null;
}

const SelectionPopover: FunctionComponent<SelectionPopoverProps> = (
  props: SelectionPopoverProps
) => {
  const { content, baseYPos, target, customClientRect } = props;

  return (
    <Popover
      mount={target}
      target={target}
      render={({ clientRect, isCollapsed, textContent }) => {
        if (
          content === "" ||
          customClientRect == null ||
          clientRect == null ||
          isCollapsed
        ) {
          return null;
        }

        const popoverStyles = {
          willChange: "transform", //Needed for Safari browser to correctly update
          position: "absolute",
          left: `${customClientRect.left + customClientRect.width / 2}px`,
          top: `${baseYPos + customClientRect.top - 7}px`,
          background: "white",
          borderRadius: "4px",
          filter: "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25))",
          transform: "translate(-50%, -100%)",
          userSelect: "none",
        } as CSSProperties;

        return (
          <div style={popoverStyles}>
            <Typography sx={{ p: 1 }}>{content}</Typography>
          </div>
        );
      }}
    />
  );
};

export default SelectionPopover;
