import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useState } from "react";
import Question from "@/api-utils/types/question";

interface QuestionPromptProps {
  question: Question;
  questionNumber: number;
}

const QuestionPrompt: React.FC<QuestionPromptProps> = ({
  question,
  questionNumber,
}: QuestionPromptProps) => {
  const [userSelected, setUserSelected] = useState<number | null>(null);
  const [userIsCorrect, setUserIsCorrect] = useState<boolean | null>(null);

  const userMadeSelection = (index: number) => {
    setUserSelected(index);
    setUserIsCorrect(index === question.correctAnswer);
  };

  return (
    <Paper elevation={1} sx={{ p: 2, width: "100%" }}>
      <Typography width="100%" textAlign="center" variant="h5" mb={2} mt={1}>
        {question.prompt}
      </Typography>
      <Grid container spacing={2} width="100%">
        {question.answers.map((answer, index) => (
          <Grid xs={12} sm={6} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                width: "100%",
                height: "100%",
                border: 2,
                borderColor: "transparent",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s ease-in-out",
                ...(index === userSelected &&
                  userIsCorrect && {
                    borderColor: "success.light",
                  }),
                ...(index === userSelected &&
                  !userIsCorrect && {
                    borderColor: "error.light",
                  }),
              }}
              key={index}
              onMouseUp={() => userMadeSelection(index)}
            >
              <Typography textAlign="center">{answer}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default QuestionPrompt;
