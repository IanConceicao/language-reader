import { IconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomIconProps extends IconButtonProps {
  disabledcolor?: string;
}

const CustomIconButton = styled(IconButton)<CustomIconProps>(
  ({ theme, disabledcolor }) => ({
    transition: theme.transitions.create(["color", "transform"], {
      duration: theme.transitions.duration.standard,
    }),
    "&.Mui-disabled": {
      color: disabledcolor,
    },
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  })
);

export default CustomIconButton;
