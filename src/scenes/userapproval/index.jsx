import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import { mockUsers } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useState, useEffect } from "react";

import { useLocation, useNavigate } from 'react-router-dom';


const Userapproval = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [userlist, setUserlist] = useState([]);

  const getRowId = (row) => row.user_id;

  const getUsersList = async () => {
    try {
        const response = await axiosPrivate.get('/showunaprrovedusers', {
            // signal: controller.signal
        });
        setUserlist(response.data);

    } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
}

  useEffect (() => {
    let isMounted = true;
    isMounted && getUsersList();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);





const handleApproveClick = async (user_id) =>{
  try {
    const response = await axiosPrivate.put(`/approveuser/${user_id}`, {
        // signal: controller.signal
    }).then(()=>{
      alert("Approve Successfull");
      getUsersList();
    })
    
} catch (err) {
    console.error(err);
    navigate('/login', { state: { from: location }, replace: true });
}
}




  const columns = [
    // { field: "id", headerName: "ID", flex: 0.5 },
    { field: "user_id", headerName: "User ID", flex: 0.5 },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
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
      },
    {
      // field: "accessLevel", onClick={()=>handleProjectEdit(params.row.project_id)}
      headerName: "Approve",
      flex: 1,
      renderCell: (params) => (
        <Box
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
        onClick={()=>handleApproveClick(params.row.user_id)}
        backgroundColor={
          colors.greenAccent[600]
        }
        style={{cursor: "pointer"}}
        borderRadius="4px"
      >
        {/* {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
        {access === "manager" && <SecurityOutlinedIcon />}
        {access === "user" && <LockOpenOutlinedIcon />} */}
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          Approve
        </Typography>
      </Box>
      )
    },
  ];

  return (
    <Box style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
      <Header
        title="User Approvals"
        // subtitle="List of Users for Future Reference"
      />

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
          rows={userlist}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default Userapproval;
