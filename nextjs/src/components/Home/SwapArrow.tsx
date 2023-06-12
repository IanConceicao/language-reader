import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DETECT_LANGUAGE } from "../../api-utils/data/supportedLanguages";
import CustomIconButton from "../SlowIconButton";

interface SwapArrowProps {
  currentLanguage: String;
  onClick(): void;
}

const SwapArrow: React.FC<SwapArrowProps> = ({ currentLanguage, onClick }) => {
  const Icon = () => <ArrowForwardIcon />;
  const color = grey[500];
  if (currentLanguage === DETECT_LANGUAGE) {
    return (
      <CustomIconButton
        disabled={true}
        sx={{ m: 0, p: 0, color: color }}
        disabledcolor={color}
      >
        <Icon />
      </CustomIconButton>
    );
  } else {
    return (
      <Tooltip enterDelay={500} title="Swap the languages">
        <CustomIconButton onClick={onClick} sx={{ m: 0, p: 0, color: color }}>
          <Icon />
        </CustomIconButton>
      </Tooltip>
    );
  }
};

export default SwapArrow;
