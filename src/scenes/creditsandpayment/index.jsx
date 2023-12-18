import { Box, useTheme, Typography, TextField, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Modal from "@mui/material/Modal";

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useState, useEffect } from "react";

import { useLocation, useNavigate } from 'react-router-dom';

const Creditsandpayment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [userlist, setUserlist] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUserId, setselectedUserId] = useState();
  const [selectedCredits, setselectedCredits] = useState(30);

  const getRowId = (row) => row.user_id;

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const credits_list = [
    {"id" : 1, Amount : 10},
    {"id" : 2, Amount : 20},
    {"id" : 3, Amount : 30},
    {"id" : 4, Amount : 40},
    {"id" : 5, Amount : 50},
    {"id" : 6, Amount : 60},
  ]

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: colors.primary[400],
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: '100vh', // Set maximum height
    overflowY: 'auto', // Enable vertical scroll if content overflows
  };

  const getUsersList = async () => {
    try {
        const response = await axiosPrivate.get('/creditsrequestedusers', {
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

const AddCredits = async ()=>{
  try {
    const response = await axiosPrivate.put(`/addcredits/${selectedUserId}`, 
      JSON.stringify({
        credits: selectedCredits,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    ).then(()=>{
      alert("Credis Added Succesfully");
      getUsersList();
      setselectedCredits(30);
      handleClose();
    })
    
} catch (err) {
    console.error(err);
    navigate('/login', { state: { from: location }, replace: true });
}
}

const handleApproveClick = async (user_id) =>{
  setselectedUserId(user_id);
  handleOpen();

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
    headerName: "Add Credits",
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
        Add
      </Typography>
    </Box>
    )
  },
];


  return (
    <Box style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* <div
              className="editModal"
              style={{
                height: "30px",
                width: "30px",
                position: "absolute",
                top: 0,
                right: 0,
                cursor: "pointer",
              }}
            >
            </div> */}
            <Typography  id="modal-modal-title" variant="h3" component="h2">
              Adding Credits ...
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Typography  variant="h4">Select credits you want to add </Typography>

              <TextField
                select
                label="Credits"
                variant="outlined"
                // value={databasename}
                // onChange={(event)=>setDatabasename(event.target.value)}
                placeholder="Role"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                id="role"
                value={selectedCredits}
                onChange={(event) => {
                  setselectedCredits(event.target.value);
                }}
                type="text"
                
              >
                {credits_list.map((item, index) => (
                  <MenuItem key={index} value={item.Amount}>
                    {item.Amount}
                  </MenuItem>
                ))}
              </TextField>
              

              <div className="flex  align-items-center mt-4">
              
                <button
                  type="button"
                  className="btn "
                  style = {{backgroundColor: colors.grey[100], color: colors.greenAccent[600]}}
                  // data-bs-dismiss="modal"
                  onClick={AddCredits}
                >
                  Submit
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}

      <Header
        title="Credits & Payment"
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

export default Creditsandpayment;
