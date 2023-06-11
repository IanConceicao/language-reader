import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Paper, Stack, Typography } from "@mui/material";

const QuizFailedLoad: React.FC = () => {
  return (
    <Paper elevation={2} sx={{ py: 2, px: 3, width: "100%" }}>
      <Stack direction="column" spacing={2} alignItems={"center"}>
        <ErrorOutlineOutlinedIcon color="error" fontSize="large" />
        <Typography variant="body1" textAlign="center">
          Whoops, looks like the quiz failed to be made. This is entirely our
          fault, and happens because GPT-3.5 is unpredictable by design, and
          also unstable because of its incredibly high demand. It is recommended
          to try again another time.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default QuizFailedLoad;
