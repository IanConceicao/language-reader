import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { Box, Stack, useTheme } from "@mui/material";
import Fab from "@mui/material/Fab";

interface QuizProps {
  text: string;
  inputLanguage: string;
  outputLanguage: string;
}

const Quiz: React.FC<QuizProps> = (props: QuizProps) => {
  const { text, inputLanguage, outputLanguage } = props;
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent="center">
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Fab variant="extended" sx={{ boxShadow: 3 }}>
          <HelpOutlinedIcon sx={{ mr: 2 }} />
          Generate a quiz
        </Fab>
      </Box>
    </Stack>
  );
};

export default Quiz;
