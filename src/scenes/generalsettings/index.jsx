import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Generalsettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="General Settings" subtitle="You can configure your general site settings and  options for user from this settings menu. " />
    </Box>
  );
};

export default Generalsettings;
