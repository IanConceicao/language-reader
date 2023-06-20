import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Paper, Stack, Typography } from "@mui/material";

const QuizFailedLoad: React.FC = () => {
  return (
    <Paper elevation={2} sx={{ py: 2, px: 3, width: "100%" }}>
      <Stack direction="column" spacing={2} alignItems={"center"}>
        <Stack direction="row" alignItems={"center"} spacing={1}>
          <ErrorOutlineOutlinedIcon color="error" fontSize="large" />
          <Typography fontSize="large">
            Whoops! Failed to make the quiz.
          </Typography>
        </Stack>
        <Typography variant="body1" textAlign="center">
          This is entirely our fault, and happens because GPT-3.5 is
          unpredictable by design, and also unstable because of its incredibly
          high demand. It is recommended to try again another time.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default QuizFailedLoad;
