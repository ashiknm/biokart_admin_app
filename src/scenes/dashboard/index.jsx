import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import { mockUsers } from "../../data/mockData";
import { mockProjects } from "../../data/mockData";
import { mockSamples } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PeopleIcon from '@mui/icons-material/People';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useState, useEffect } from "react";

import { useLocation, useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [admindata, setAdmindata] = useState({});
  const [credithistory, setCredithistory] = useState([]);

  const [usercount, setUsercount] = useState();
  const [projectcount, setProjectcount] = useState();
  const [samplecount, setSamplecount] = useState();

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

  const getCreditHistory = async () => {
    try {
        const response = await axiosPrivate.get(`/showallcredithistory`, {
            // signal: controller.signal
        });
        isMounted && setCredithistory(response.data);
      
        

    } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
}

  const getdashboardcount = async () => {
    let response2 = null;
    try {
        response2 = await axiosPrivate.get(`/dashboardcount`, {
            // signal: controller.signal
        });
        if(isMounted){
          setUsercount(response2.data.users_count);
          setProjectcount(response2.data.projects_count);
          setSamplecount(response2.data.samples_count);
        }
      
        

    } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
}


     getAdmindata();
     getCreditHistory();
     getdashboardcount();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);


 


  return (
    <Box   style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={usercount}
            subtitle="Total Users"
            progress="0.75"
            increase="+14%"
            icon={
              <PeopleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
               />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={projectcount}
            subtitle="Totral Projects"
            progress="0.50"
            increase="+21%"
            icon={
              <BackupTableIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={samplecount}
            subtitle="Total Samples"
            progress="0.30"
            increase="+5%"
            icon={
              <LibraryBooksIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Revenue"
            progress="0.80"
            increase="+43%"
            icon={
              <CurrencyRupeeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          {/* <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total Count
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {mockProjects.length}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box> */}
          <Box height="300px" >
            <LineChart style = {{height : "100%"}} isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {credithistory.map((transaction, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.transaction_id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user_name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                Cr. {transaction.credits_used}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Processing...
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              4 Projects are processing
            </Typography>
            <Typography textAlign={"center"}>processing is optimized! you can still add two more projects</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Users
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
