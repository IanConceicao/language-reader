import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import { useRef, useState } from "react";
import { translateAndCreateQuiz } from "@/util/apiCalls";
import Question from "../../util/types/Question";
import QuestionPrompt from "./QuestionPrompt";
import QuizFailedLoad from "./QuizFailedLoad";
import QuizLoader from "./QuizLoader";

interface QuizProps {
  text: string;
  inputLanguage: string;
  outputLanguage: string;
}

const Quiz: React.FC<QuizProps> = (props: QuizProps) => {
  const { text, inputLanguage, outputLanguage } = props;
  const theme = useTheme();

  const [disableQuizButton, setDisableQuizButton] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  const [showError, setShowError] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  const getQuestions = async () => {
    setDisableQuizButton(true);
    setShowPlaceHolder(true);
    scrollToQuiz();
    const questionReturn: Question[] | null = await translateAndCreateQuiz(
      inputLanguage,
      outputLanguage,
      text
    );
    if (questionReturn !== null) {
      setQuestions(questionReturn);
    } else {
      setShowError(true);
    }
    setShowPlaceHolder(false);
  };

  const scrollToQuiz = () => {
    // Timeout is a chrome work-around. See: https://github.com/facebook/react/issues/23396
    setTimeout(() => {
      if (quizRef && quizRef.current) {
        window.scroll({
          behavior: "smooth",
          top: quizRef.current.offsetTop,
        });
      }
    }, 200);
  };

  return (
    <Stack direction="column" alignItems="center" spacing={4}>
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Fab
          variant="extended"
          sx={{ boxShadow: 3 }}
          disabled={disableQuizButton}
          onClick={getQuestions}
        >
          <QuizOutlinedIcon sx={{ mr: 2 }} />
          Take a quiz
        </Fab>
        <div ref={quizRef}></div>
      </Box>
      {showPlaceHolder && <QuizLoader />}
      {showError && <QuizFailedLoad />}
      {questions.map((question, num) => (
        <QuestionPrompt
          question={question}
          key={num}
          questionNumber={num + 1}
        />
      ))}
    </Stack>
  );
};

export default Quiz;
