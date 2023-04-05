import {
  Fade,
  Paper,
  Popper,
  PopperProps,
  Typography,
  useTheme,
} from "@mui/material";
import { FunctionComponent } from "react";

interface SelectionPopoverProps {
  content: string;
  anchorEl: PopperProps["anchorEl"];
  display: boolean;
}

const SelectionPopover: FunctionComponent<SelectionPopoverProps> = (
  props: SelectionPopoverProps
) => {
  const { content, anchorEl: domRect, display } = props;
  const theme = useTheme();

  return (
    <Popper
      id={"translation-popper"}
      open={display}
      anchorEl={domRect}
      transition
      placement="top"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={300}>
          <Paper
            sx={{
              maxWidth: "90vw",
              background: theme.palette.background.default,
            }}
          >
            <Typography sx={{ p: 1.2 }}>{content}</Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default SelectionPopover;
