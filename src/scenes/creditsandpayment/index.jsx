import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Creditsandpayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Credits and Payment" subtitle="credits & payment page" />
    </Box>
  );
};

export default Creditsandpayment;
