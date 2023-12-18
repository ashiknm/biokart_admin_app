import React from "react";
import { Box, Button, Typography, useTheme, TextField, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Modal from "@mui/material/Modal";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from "react-phone-number-input";

import InfoIcon from "@mui/icons-material/Info";

import { countries } from "../../data/mockData";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useState, useEffect, useRef } from "react";

import { useLocation, useNavigate } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_ -]{3,23}$/;
const Email_regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const errorRef = useRef();


  const [open, setOpen] = React.useState(false);

  const [fullName, setFullName] = useState("");
  const [validName, setValidName] = useState(false);

  const [username, setUsername] = useState("");


  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");



  const [phonenumber, setPhonenumber] = useState("");


  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const [role, setRole] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmpassword, setValidConfirmpassword] = useState(false);

  const [adminList, setAdminList] = useState([]);

  const getRowId = (row) => row.admin_id;

  const getAdminList = async () => {
    try {
        const response = await axiosPrivate.get('/showalladmins', {
            // signal: controller.signal
        });
        setAdminList(response.data);

    } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
}

  useEffect (() => {
    let isMounted = true;
    isMounted && getAdminList();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);

  const admin_roles = [
    {"id" : 1, role : "Admin"},
    {"id" : 2, role : "Manager"},
    {"id" : 3, role : "Approver"},
  ]


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getEmailUsername = () => {
    // Using regular expression to extract the username before the @ symbol
    if(email && validEmail){
      const user_name = email.match(/^([^@]*)@/)[1];
      setUsername(user_name);
    }
    
  };

  useEffect(() => {
    const result = USER_REGEX.test(fullName);
    setValidName(result);
  }, [fullName]);


  useEffect(() => {
    const result = Email_regex.test(email);
    setValidEmail(result);
    getEmailUsername();
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmpassword(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [confirmPassword]);

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
    position : 'relative'
  };

  const columns = [
    { field: "admin_id", headerName: "ID" },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
           className="flex justify-around"
            width="100px"
            m="0 auto"
            p="5px"
            backgroundColor={
              role === '["admin"]'
                ? colors.greenAccent[600]
                : role === '["approver"]'
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === '["admin"]' && <AdminPanelSettingsOutlinedIcon />}
            {role === '["manager"]' && <SecurityOutlinedIcon />}
            {role === '["approver"]' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role==='["superadmin"]'?"superadmin":
              role==='["admin"]'?"admin":
              role==='["manager"]'?"manager":
              "approver"
            }
            </Typography>
          </Box>
        );
      },
    },
  ];

  const handleAddAdmin = async () => {
    try {


    const response = await axiosPrivate.post(`/registeradmin`,
    JSON.stringify({
        full_name : fullName,
        username: username,
        password : password,
        email : email,
        phone : phonenumber,
        address : address,
        country : country,
        role : `["${role}"]`
    }),{
        headers : {'Content-Type' : 'application/json'},
        withCredentials: true
    }).then(()=>{
      handleClose();
      setFullName('');
      setUsername('');
      setPhonenumber('');
      setEmail('');
      setAddress('');
      setCountry('');
      setRole('');
      setPassword('');
      setConfirmPassword('');
      toast.success("Admin Added Successfully !!");
    })

    } catch (err) {
    if(!err?.response){
      setErrorMsg("No Seerver Rewsponse");
    }else if(err.response?.status === 409){
      setErrorMsg("User already registerd");
    }else{
      setErrorMsg("Registration Failed");
    }
    errorRef.current.focus();
  }

  };

  return (
    <Box m="20px" style={{ position: "relative" }}>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Add New Admin
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p ref = {errorRef} aria-live="assertive" className={errorMsg ? "p-2 text-sm text-danger": "hidden"}>{errorMsg}</p>
            <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            
            <TextField
              label="Name" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your Name *"
              required
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
            />
            <p
                id="uidnote"
                className={
                  fullName && !validName
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                4 to 24 characters. <br />
                Must begin with a letter <br />
                Letters, numbers, underscores, hyphens allowed <br />
              </p>

          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            

          <TextField
            label="Email" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email Address *"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote3"
            />
             <p
                id="uidnote3"
                className={
                  email && !validEmail
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                Email Address is not valid
              </p>
          </div>
          

          <div className="w-full md:w-1/2 px-2 mb-4">
            
          <div
                className="border flex align-items-center p-2 rounded w-full"
                style={{ borderColor: "black", height : "50px" }}
              >
                <PhoneInput
                  className="text-dark"
                  placeholder="Enter phone number"
                  style={{ border: "none", color: "black" }}
                  value={phonenumber}
                  onChange={setPhonenumber}
                  error={
                    phonenumber && isPossiblePhoneNumber(phonenumber)
                      ? "true"
                      : "false"
                  }
                />
              </div>
          </div>
         
          <div className="w-full md:w-1/2 px-2 mb-4">
            
            <TextField
             label="Address" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
          <TextField
                select
                label="Country"
                variant="outlined"
                // value={databasename}
                // onChange={(event)=>setDatabasename(event.target.value)}
                placeholder="Country"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                value={country}
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
                type="text"
              >
                {countries.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
          <TextField
                select
                label="Role"
                variant="outlined"
                // value={databasename}
                // onChange={(event)=>setDatabasename(event.target.value)}
                placeholder="Role"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                }}
                type="text"
              >
                {admin_roles.map((item, index) => (
                  <MenuItem key={index} value={item.role}>
                    {item.role}
                  </MenuItem>
                ))}
              </TextField>
         
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <TextField
             label="Password" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="uidnote5"
            />
            <p
                id="uidnote5"
                className={
                  password && !validPassword
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number and a
                special character. <br />
                Allowed Special characters:{" "}
                <span aria-label="explanation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
                <br />
              </p>
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <TextField
             label="Confirm Password" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              aria-invalid={validConfirmpassword ? "false" : "true"}
              aria-describedby="uidnote6"
            />
             <p
                id="uidnote6"
                className={
                  confirmPassword && !validConfirmpassword
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                Password does not match
              </p>
          </div>
        </div>

              <div className="flex justify-center  align-items-center mt-4 w-100"> 
              <button
                  className="btn text-light"
                  style={{ backgroundColor: colors.greenAccent[700] }}
                  onClick={handleAddAdmin}
                >
                  Add Admin
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
      <Header title="TEAM" />
      <Box
        onClick={handleOpen}
        width="10%"
        m="0 auto"
        p="10px"
        display="flex"
        justifyContent="center"
        backgroundColor={colors.greenAccent[700]}
        borderRadius="4px"
        style={{ position: "absolute", top: 0, right: "5%", cursor: "pointer" }}
      >
        <AdminPanelSettingsOutlinedIcon />
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          Add Admin
        </Typography>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
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
        }}
      >
        <DataGrid checkboxSelection rows={adminList} columns={columns} getRowId={getRowId} />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Team;
