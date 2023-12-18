import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import { mockUsers } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useState, useEffect } from "react";

import { useLocation, useNavigate } from 'react-router-dom';




const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState('all');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [userlist, setUserlist] = useState([]);

  const getRowId = (row) => row.user_id;


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredRows = userlist.filter((row) => row.exported === 0);

  useEffect (() => {
    let isMounted = true;
   
    const getUsersList = async () => {
      try {
          const response = await axiosPrivate.get('/showallusers', {
              // signal: controller.signal
          });
          isMounted && setUserlist(response.data);

      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }

     getUsersList();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);



  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    { field: "user_id", headerName: "User ID", flex: 0.5 },
    {
      // field: "full_name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        // Access the "id" property from the rowData and log it to the console
        
        // You can also return a different content to be displayed in the cell if needed

        // console.log("user clicked",params.row.user_id);
        
        <div style={{"cursor" : "pointer"}} className="id-column--cell" onClick={()=>navigate(`/userprofile/${params.row.user_id}`, {state:{updates: false}})}>
          {/* Custom cell content goes here */}
          {params.row.full_name}
        </div>
      )

    },
      {
        field: "username",
        headerName: "User Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 0.7,
        align: "center",
      },
      {
        field: "institution_organization",
        headerName: "Organization",
        flex: 1,
      },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "project_count",
      headerName: "Projects",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.5
    },
    {
        field: "samples_count",
        headerName: "Samples",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 0.5
      },
      {
        field: "credits_remaining",
        headerName: "Credits",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 0.5
      }
  ];

  return (
    <Box style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
      <Header
        title="USERS"
        // subtitle="List of Users for Future Reference"
      />



    <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="all" label="All Users" ></Tab>
        <Tab value="new" label="New Users" ></Tab>
      </Tabs>


 
      <Box
        m="20px 0 0 0"
        height="78vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          
          rows={value === 'all' ? userlist : filteredRows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default Users;
