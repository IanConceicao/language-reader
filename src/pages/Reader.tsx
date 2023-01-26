import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

interface ReaderProps {}

const Reader: React.FC<ReaderProps> = () => {
  const [searchParams] = useSearchParams();

  return <Typography variant="h5">{searchParams.get("text")}</Typography>;
};

export default Reader;
