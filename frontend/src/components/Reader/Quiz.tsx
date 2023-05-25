import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { Box, Stack, useTheme } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import QuizLoader from "./QuizLoader";

interface QuizProps {
  text: string;
  inputLanguage: string;
  outputLanguage: string;
}

const Quiz: React.FC<QuizProps> = (props: QuizProps) => {
  const { text, inputLanguage, outputLanguage } = props;
  const theme = useTheme();
  const [showQuiz, setShowQuiz] = useState(false);
  return (
    <Stack direction="column" alignItems="center" spacing={3}>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Fab variant="extended" sx={{ boxShadow: 3 }}>
          <QuizOutlinedIcon sx={{ mr: 2 }} />
          Take a quiz
        </Fab>
      </Box>
      <QuizLoader />
    </Stack>
  );
};

export default Quiz;
