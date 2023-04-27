import { IconButton, IconButtonProps, styled } from "@mui/material";

interface CustomIconProps extends IconButtonProps {
  disabledColor?: string;
}

const CustomIconButton = styled(IconButton)<CustomIconProps>(
  ({ theme, disabledColor }) => ({
    transition: theme.transitions.create(["color", "transform"], {
      duration: theme.transitions.duration.standard,
    }),
    "&.Mui-disabled": {
      color: disabledColor,
    },
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  })
);

export default CustomIconButton;
