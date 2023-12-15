import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockSamples } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useState, useEffect } from "react";

import { useLocation, useNavigate } from 'react-router-dom';

const Samples = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = React.useState('all');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [sampleList, setSampleList] = useState([]);

  const getRowId = (row) => row.sample_id;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filteredRows = sampleList.filter((row) => row.exported === 0);

  useEffect (() => {
    let isMounted = true;
   
    const getSampleList = async () => {
      try {
          const response = await axiosPrivate.get('/showallsamples', {
              // signal: controller.signal
          });
          isMounted && setSampleList(response.data);
         

      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }

     getSampleList();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);

  const columns = [
    { field: "sample_id", headerName: "Sample ID", flex: 0.5  },
    {
      field: "sample_name",
      headerName: "Sample Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "project_id",
      headerName: "Project Id",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5 
    },
    {
      field: "user_id",
      headerName: "User Id",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5 
    },
    {
        field: "date",
        headerName: "Date",
        flex: 1,
      },
      {
        field: "file_size",
        headerName: "Size",
        type: "number",
        headerAlign: "left",
        align: "left",
        flex: 0.5 
      }
  ];

  return (
    <Box style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
      <Header
        title="Samples"
        // subtitle="List of Samples for Future Reference"
      />
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="all" label="All Samples" ></Tab>
        <Tab value="new" label="New Samples" ></Tab>
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
           rows={value === 'all' ? sampleList : filteredRows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default Samples;
