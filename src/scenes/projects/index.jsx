import { Box , Button} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockProjects } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import * as XLSX from 'xlsx';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useState, useEffect } from "react";

import { useLocation, useNavigate } from 'react-router-dom';

const Projects = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState('all');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [projectlist, setProjectlist] = useState([]);

  const getRowId = (row) => row.project_id;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getStatusColor = (status) => {
    // Define color mapping based on status values
    switch (status) {
      case 'saved':
        return '#ffc107'; // Yellow
      case 'downloaded':
        return '#28a745'; // Green
      case 'executed':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Gray
    }
  };

  const filteredRows = projectlist.filter((row) => row.exported === 0);

  useEffect (() => {
    let isMounted = true;
   
    const getProjectList = async () => {
      try {
          const response = await axiosPrivate.get('/showallprojects', {
              // signal: controller.signal
          });
          isMounted && setProjectlist(response.data);
          

      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }

     getProjectList();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);

  const columns = [
    { field: "project_id", headerName: "Project ID" , flex: 0.4},
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      
    },
    {
      field: "user_id",
      headerName: "User Id",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.5
    },
   
    {
      field: "confidence",
      headerName: "Confidence",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.5
    },
    {
        field: "sample_size",
        headerName: "Sample size",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 0.5
      },
      {
        field: "folder_size",
        headerName: "Folder size",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 0.5
      },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            borderRadius="4px"
          >
            <button
          style={{
            minWidth:"100px",
            backgroundColor: getStatusColor(params.row.status),
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {params.row.status}
        </button>
          </Box>
        
      )
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    }
   
  ];

  const handleExportClick = () => {
    const data = filteredRows.map(row => columns.map(col => row[col.field]));
    const ws = XLSX.utils.aoa_to_sheet([columns.map(col => col.headerName), ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, 'exported_data.xlsx');
  };

  return (
    <Box style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
      <Header
        title="Projects"
        // subtitle="List of Projects for Future Reference"
      />
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="all" label="All Projects" ></Tab>
        <Tab value="new" label="New Projects" ></Tab>
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
          "& .MuiDataGrid-toolbarContainer .MuiDataGrid-toolbarExport": {
             display: "none"
          }
        }}
      >
        <DataGrid
           rows={value === 'all' ? projectlist : filteredRows}
          columns={columns}
          components={{
            Toolbar: () => (
              
              <div>
                <GridToolbar />
                <Button style= {{backgroundColor: "white"}} variant="outlined" onClick={handleExportClick}>
                  Export
                </Button>
              </div>
            ),
          }}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default Projects;
