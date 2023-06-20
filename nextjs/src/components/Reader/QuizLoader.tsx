import { LinearProgress, Paper, Stack, Typography } from "@mui/material";

interface QuizLoaderProps {}
const QuizLoader: React.FC<QuizLoaderProps> = (props: QuizLoaderProps) => {
  return (
    <Paper elevation={2} sx={{ py: 2, px: 3, width: "100%" }}>
      <Stack direction="column" spacing={2}>
        <Typography variant="h4" textAlign="center">
          Generating your quiz
        </Typography>
        <Typography variant="body1" textAlign="center">
          Language Reader in real time uses OpenAI&apos;s state of the art
          GPT-3.5 language model to generate a quiz for this text. Please be
          patient— generating a quiz may take up to a minute depending on the
          size of the text due to the nature of large language models and spikes
          in demand.
        </Typography>
        <LinearProgress />
      </Stack>
    </Paper>
  );
};

export default QuizLoader;
