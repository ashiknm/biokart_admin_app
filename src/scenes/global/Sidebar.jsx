import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleIcon from '@mui/icons-material/People';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ForumIcon from '@mui/icons-material/Forum';
import QuizIcon from '@mui/icons-material/Quiz';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useLocation, useNavigate } from 'react-router-dom';

import { useSelected } from "../../context/SelectedProvider";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selected, setSelected, setDefaultSelected } = useSelected();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [admindata, setAdmindata] = useState({});


  useEffect (() => {
    let isMounted = true;
    // const controller = new AbortController();
    const adminId = localStorage.getItem("adminId");

    const getAdmindata = async () => {
      try {
          const response = await axiosPrivate.get(`/admindetails/${adminId}`, {
              // signal: controller.signal
          });
          isMounted && setAdmindata(response.data);

      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }
     getAdmindata();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);

useEffect(() => {
  // Update the selected state when the location changes (e.g., back navigation)
  const pathWithoutSlash = location.pathname === '/' ? 'dashboard' : location.pathname.slice(1);
  setSelected(pathWithoutSlash);
}, [location.pathname, setSelected]);


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  BIOKART
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {admindata.full_name}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                {admindata.role==='["superadmin"]'?"superadmin":
              admindata.role==='["admin"]'?"admin":
              admindata.role==='["manager"]'?"manager":
              "approver"
            }
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage Users
            </Typography>
            {(admindata.role==='["superadmin"]' || admindata.role==='["admin"]') &&
              <Item
              title="team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            }
            
            {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

{(admindata.role==='["superadmin"]' || admindata.role==='["approver"]') &&
              <Item
              title="userapproval"
              to="/userapproval"
              icon={<VerifiedUserIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            }

{(admindata.role==='["superadmin"]' || admindata.role==='["approver"]' || admindata.role==='["admin"]') &&
               <Item
               title="userdetailsapproval"
               to="/userdetailsapproval"
               icon={<HowToRegIcon />}
               selected={selected}
               setSelected={setSelected}
             />
            }

{(admindata.role==='["superadmin"]' || admindata.role==='["admin"]' ) &&
                <Item
                title="users"
                to="/users"
                icon={<PeopleIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            }
              
            
             
            
            {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

{(admindata.role==='["superadmin"]' || admindata.role==='["admin"]' || admindata.role==='["manager"]') &&
        <div>
                 <Typography
                 variant="h6"
                 color={colors.grey[300]}
                 sx={{ m: "15px 0 5px 20px" }}
               >
                 Manage Projects
               </Typography>
               <Item
                 title="projects"
                 to="/projects"
                 icon={<BackupTableIcon />}
                 selected={selected}
                 setSelected={setSelected}
               />
                 <Item
                 title="samples"
                 to="/samples"
                 icon={<LibraryBooksIcon />}
                 selected={selected}
                 setSelected={setSelected}
               />
          </div>
            }


{(admindata.role==='["superadmin"]' || admindata.role==='["admin"]' ) &&
        <div>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Settings
            </Typography>
            <Item
              title="generalsettings"
              to="/generalsettings"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="creditsandpayment"
              to="/creditsandpayment"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="messages"
              to="/messages"
              icon={<ForumIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
          /> */}
            <Item
              title="faq"
              to="/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
          </div>
            }

{(admindata.role==='["superadmin"]' || admindata.role==='["admin"]') &&
        <div>
           
           <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="bar"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="pie"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="line"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="geography"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
            }
         

 

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
