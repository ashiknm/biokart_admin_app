import { Box, IconButton, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';

import useLogout from "../../hooks/useLogout";

import { useSelected } from "../../context/SelectedProvider";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const logout = useLogout();
  const navigate = useNavigate();

  const {setSelected } = useSelected();

  const SignOut = async () =>{
    await logout();
    navigate("/login");
  }

  const handleSettingsIcon = () =>{
    setSelected("generalsettings");
    navigate('/generalsettings');
  };

  const handleNotificationIcon = () =>{
    setSelected("messages");
    navigate('/messages');
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleNotificationIcon}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleSettingsIcon}>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
        <IconButton onClick={SignOut}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
