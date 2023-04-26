import { IconButton, IconButtonProps, styled } from "@mui/material";

const CustomIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  transition: theme.transitions.create(["color", "transform"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
  },
}));

export default CustomIconButton;
