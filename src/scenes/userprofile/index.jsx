import * as React from "react";
import { Box, Button, Typography,  MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import ToggleSwitch from "../../components/ToggleSwitch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import useAuth from "../../hooks/useAuth";
import Modal from "@mui/material/Modal";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from "react-phone-number-input";

import { countries } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import Statbox2 from "../../components/StatBox2";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { useState, useEffect, useRef } from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

import InfoIcon from "@mui/icons-material/Info";

import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import FolderIcon from "@mui/icons-material/Folder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ClassIcon from "@mui/icons-material/Class";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import LockIcon from "@mui/icons-material/Lock";
import { registerables } from "chart.js";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_ -]{3,23}$/;
const Email_regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const approved_mail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+@(edu\.in)$/; 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Userprofile = () => {
  const { userId } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const errorRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [userdata, setUserdata] = useState({});
  const [userupdatesdata, setUserupdatesdata] = useState({});
  const [projectdata, setProjectdata] = useState([]);
  const [sampledata, setSampledata] = useState([]);

  const [open, setOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [validName, setValidName] = useState(false);


  const [piName, setPiName] = useState("");
  const [validPiName, setValidPiName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [department, setDepartment] = useState("");
  const [validDepartment, setValidDepartment] = useState(false);

  const [phonenumber, setPhonenumber] = useState("");

  const [institute_organization, setInstitute_organization] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmpassword, setValidConfirmpassword] = useState(false);

  const [passwordSet, setPasswordSet] = useState(false);
  const [checked, setChecked] = useState(false);

  const [showupdates, setShowupdates] = useState(location.state.updates);


  const [projectSelected, setProjectSelected] = useState(false);
  const [projectId, setProjectId] = useState();
  const [projectName, setProjectName] = useState();

  const [confidence, setConfidence] = useState();
  const [core, setCore] = useState();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: colors.primary[400],
    boxShadow: 24,
    p: 4,
    maxHeight: '100vh', // Set maximum height
    overflowY: 'auto', // Enable vertical scroll if content overflows
    position : 'relative'
  };


  useEffect(() => {
    const result = USER_REGEX.test(fullName);
    setValidName(result);
  }, [fullName]);

  useEffect(() => {
    const result = USER_REGEX.test(piName);
    setValidPiName(result);
  }, [piName]);

  useEffect(() => {
    const result = Email_regex.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(department);
    setValidDepartment(result);
  }, [department]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmpassword(match);
  }, [password, confirmPassword]);


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () =>{
    setOpen(false);
  }

  const getUserUpdatesdata = async () =>{
    try {
      const response = await axiosPrivate.get(`/showupdaterequestedusersbyid/${userId}`, {
        // signal: controller.signal
      });
      setUserupdatesdata(response.data);


    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  }

  const getUserData = async () => {
    try {
      console.log("userid :", userId);
      const response = await axiosPrivate.get(`/oneuser/${userId}`, {
        // signal: controller.signal
      });
      setUserdata(response.data);
      const user = response.data;
      setFullName(user.full_name);
      setEmail(user.email);
      setPiName(user.project_incharge_name);
      setDepartment(user.research_department);
      setPhonenumber(user.phone);
      setInstitute_organization(user.institution_organization);
      setAddress(user.address);
      setCountry(user.country);
      setConfidence(user.confidence);
      setCore(user.no_of_cores);
      // setPassword(user.password);
      if ( showupdates && response.data.update_status === "pending") {
        setChecked(true);
        getUserUpdatesdata();
      }
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getProjectData = async () => {
      try {
        const response = await axiosPrivate.get(`/showallprojects/${userId}`, {
          // signal: controller.signal
        });
        isMounted && setProjectdata(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    isMounted && getUserData();
    getProjectData();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, [userId, location]);

  useEffect(() => {
    let isMounted = true;
    const getSampleData = async () => {
      try {
        const response = await axiosPrivate.get(
          `/samplebyprojectid/${userId}`,
          {
            // signal: controller.signal
          }
        );
        isMounted && setSampledata(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    isMounted && getSampleData();
    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, [projectId]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmpassword(match);
  }, [password, confirmPassword]);

  const updateprofile = async () =>{
    const response = await axiosPrivate
    .put(
      `/updaterequesteduser/${userId}`,
      JSON.stringify({
        "full_name"               : fullName,
        "email"                   : email,
        "phone"                   : phonenumber,
        "institution_organization": institute_organization,
        "research_department"     : department,
        "project_incharge_name"   : piName,
        "address"                 : address,
        "country"                 : country,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
    .then(() => {
      toast.success("Details Approved Successfully ");
      setShowupdates(false);
      setChecked(false)
      getUserData();
    });
  }

  

  const handleUserUpdate = async () =>{
        try {
          const response = await axiosPrivate.put(
            `/updateuser/${userId}`,
            JSON.stringify({
              "full_name": fullName,
              "project_incharge_name": piName,
              "email": email,
              "research_department": department,
              "phone": phonenumber,
              "institution_organization": institute_organization,
              "address": address,
              "country": country,
              "password": password,
              "no_of_cores": core,
              "confidence": confidence
            }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
              
            }
          ).then(()=>{
            setOpen(false);
            getUserData();
            toast.success("Details Updated Successfully ");
          })
          
        } catch (err) {
          if(!err?.response){
            setErrorMsg("No Seerver Rewsponse");
          }else {
            setErrorMsg("some error");
          }
          errorRef.current.focus();
      }
  }

  // const handlePasswordchange = async () => {
  //   const response = await axiosPrivate
  //     .put(
  //       `/updateuserpassword/${userId}`,
  //       JSON.stringify({
  //         password: password,
  //       }),
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       }
  //     )
  //     .then(() => {
  //       setPassword("");
  //       setConfirmPassword("");
  //       toast.success("Password Updated Successfully ");
  //     });
  // };

  const handleprojectDownload = (project_id) => {
    toast.success("Project Downloaded Successfully " + project_id);
  };

  const handlesampleDownload = () => {
    toast.success("Samples Downloaded Successfully " + projectId);
  };

  const handleprojectSelected = (project_id, project_name) => {
    setProjectSelected(true);
    setProjectId(project_id);
    setProjectName(project_name);
  };

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  const getRowId = (row) => row.project_id;
  const getRowId2 = (row) => row.sample_id;

  // const handleProjectEdit = (project_id) =>{
  //     setProjectId(project_id);
  //     setIsdataAttributeModal(true);
  // }

  const getStatusColor = (status) => {
    // Define color mapping based on status values
    switch (status) {
      case "saved":
        return "#ffc107"; // Yellow
      case "downloaded":
        return "#28a745"; // Green
      case "executed":
        return "#dc3545"; // Red
      default:
        return "#6c757d"; // Gray
    }
  };

  const columns = [
    { field: "project_id", headerName: "Id", flex: 0.3 },
    // {
    //   field: "project_id",
    //   headerName: "Project Id",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        // Access the "id" property from the rowData and log it to the console

        // You can also return a different content to be displayed in the cell if needed

        // console.log("user clicked",params.row.user_id);

        <div
          style={{ cursor: "pointer" }}
          className="id-column--cell"
          onClick={() =>
            handleprojectSelected(
              params.row.project_id,
              params.row.project_name
            )
          }
        >
          {/* Custom cell content goes here */}
          {params.row.project_name}
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.7,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "confidence",
      headerName: "Confidence",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sample_size",
      headerName: "Sample size",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "folder_size",
      headerName: "folder size",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },

    {
      // field: "accessLevel",
      headerName: "Status",
      field: "execute",
      flex: 1,
      align: "center",
      headerAlign: "center",
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
              minWidth: "100px",
              backgroundColor: getStatusColor(params.row.status),
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {params.row.status}
          </button>
        </Box>
      ),
    },
    {
      // field: "accessLevel",
      headerName: "",
      flex: 0.1,
      renderCell: (params) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          onClick={() => handleprojectDownload(params.row.project_id)}
          style={{ cursor: "pointer" }}
          borderRadius="4px"
        >
          <Typography sx={{ ml: "5px" }}>
            <DownloadForOfflineIcon />
          </Typography>
        </Box>
      ),
    },
  ];

  const columns2 = [
    { field: "sample_id", headerName: "Id", flex: 0.3 },
    // {
    //   field: "project_id",
    //   headerName: "Project Id",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "sample_name",
      headerName: "Sample Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.7,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "file_size",
      headerName: "File size",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Box
      className="flex justify-around px-2"
      style={{ height: "90vh", overflowY: "scroll" }}
    >
       {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Update User details
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p ref = {errorRef} aria-live="assertive" className={errorMsg ? "p-2 text-sm text-danger": "hidden"}>{errorMsg}</p>
            <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                autoComplete="off"
                label="Full Name"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Enter your Full Name *"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
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
                // ref = {piNameRef}
                label="P.I Name"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="piname"
                type="text"
                placeholder="P.I Name"
                value={piName}
                onChange={(event) => setPiName(event.target.value)}
                aria-invalid={validPiName ? "false" : "true"}
                aria-describedby="uidnote2"
              />
              <p
                id="uidnote2"
                className={
                  piName && !validPiName
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
                label="Email"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email Address *"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
              <TextField
                label="Department"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="department"
                type="text"
                placeholder="Department of Research"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                aria-invalid={validDepartment ? "false" : "true"}
                aria-describedby="uidnote4"
              />
              <p
                id="uidnote4"
                className={
                  department && !validDepartment
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                Department is not valid
              </p>
            </div>
            <div className="w-full flex md:w-1/2 px-2 mb-4">
              <div
                className="border flex align-items-center p-2 rounded w-full"
                style={{ borderColor: "black", backgroundColor: colors.primary[400] }}
              >
                <PhoneInput
                  defaultCountry="IN"
                  className="text-dark"
                  placeholder="Enter phone number"
                  style={{ border: "none", backgroundColor: colors.primary[400] }}
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
                label="Institue / Organization"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="institute"
                type="text"
                placeholder="Institue / Organization *"
                required
                value={institute_organization}
                onChange={(event) =>
                  setInstitute_organization(event.target.value)
                }
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="Address"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                select
                label="Country"
                variant="outlined"
                // value={databasename}
                // onChange={(event)=>setDatabasename(event.target.value)}
                laceholder="Country"
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
                label="No of Cores"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="noofcores"
                type="text"
                placeholder="noofcores"
                value={core}
                onChange={(event) => setCore(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="Confidence"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confidence"
                type="text"
                placeholder="Confidence"
                value={confidence}
                onChange={(event) => setConfidence(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="New Password"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
                label="Confirm Password"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmpassword"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
                  onClick={handleUserUpdate}
                >
                  Update
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
      <div
        className="m-auto p-2"
        style={{
          width: "27.5%",
          height: "95%",
          backgroundColor: colors.primary[400],
        }}
      >
        <div className="flex justify-between" style={{ height: "5%" }}>
          <h2 className="m-2" style={{ fontSize: "18px" }}>
            Profile <ChevronRightIcon className="ms-1" />
            <EditIcon className="cursor-pointer" onClick = {()=>setOpen(true)} />
          </h2>
          {showupdates &&
            (auth.role === '["admin"]' || auth.role === '["superadmin"]') && (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={()=>setChecked(!checked)}
                      color="secondary"
                    />
                  }
                  label="updates"
                />
              </FormGroup>
            )}
        </div>


        {!checked?
        <div style={{ height: "90%" }}>
        <div
          className="flex flex-col align-items-stretch"
          style={{ height: "90%" }}
        >
          <div
            className="flex m-1"
            style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
          >
            <div className=" w-20 flex justify-center align-items-center">
              <AccountCircleIcon style={{ fontSize: 22 }} />
            </div>
            <div className=" w-80 ">
              <small>
                <p style={{ lineHeight: "20px", fontSize: "15px" }}>
                  UserId :
                </p>
              </small>
              <p>{userdata.user_id}</p>
            </div>
          </div>
          <div
            className="flex m-1"
            style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
          >
            <div className=" w-20 flex justify-center align-items-center">
              <AccountBoxIcon style={{ fontSize: 22 }} />
            </div>
            <div className=" w-80 ">
              <small>
                <p style={{ lineHeight: "20px", fontSize: "15px" }}>Name</p>
              </small>
              <p>{userdata.full_name}</p>
            </div>
          </div>
          <div
            className=" flex m-1"
            style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
          >
            <div className=" w-20 flex justify-center align-items-center">
              <EmailIcon style={{ fontSize: 22 }} />
            </div>
            <div className=" w-80 ">
              <small>
                <p style={{ lineHeight: "20px", fontSize: "15px" }}>
                  Email address
                </p>
              </small>
              <p style={{ fontSize: "18px" }}>{userdata.email}</p>
            </div>
          </div>
          <div
            className=" flex m-1"
            style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
          >
            <div className=" w-20 flex justify-center align-items-center">
              <LocalPhoneIcon style={{ fontSize: 22 }} />
            </div>
            <div className=" w-80 ">
              <small>
                <p style={{ lineHeight: "20px", fontSize: "15px" }}>
                  Phone Number
                </p>
              </small>
              <p style={{ fontSize: "18px" }}>{userdata.phone}</p>
            </div>
          </div>
          <div
            className=" flex m-1"
            style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
          >
            <div className=" w-20 flex justify-center align-items-center">
              <CorporateFareIcon style={{ fontSize: 22 }} />
            </div>
            <div className=" w-80 ">
              <small>
                <p style={{ lineHeight: "20px", fontSize: "15px" }}>
                  Institute/Organization
                </p>
              </small>
              <p style={{ fontSize: "18px" }}>
                {userdata.institution_organization}
              </p>
            </div>
          </div>
          <div
            className=" flex m-1"
            style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
          >
            <div className=" w-20 flex justify-center align-items-center">
              <ClassIcon style={{ fontSize: 22 }} />
            </div>
            <div className=" w-80 ">
              <small>
                <p style={{ lineHeight: "20px", fontSize: "15px" }}>
                  Research Department
                </p>
              </small>
              <p style={{ fontSize: "18px" }}>
                {userdata.research_department}
              </p>
            </div>
          </div>
          <div
            className=" flex m-1"
            style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
          >
            <div className=" w-20 flex justify-center align-items-center">
              <AccountTreeIcon style={{ fontSize: 22 }} />
            </div>
            <div className=" w-80 ">
              <small>
                <p style={{ lineHeight: "20px", fontSize: "15px" }}>
                  Project Incharge
                </p>
              </small>
              <p style={{ fontSize: "18px" }}>
                {userdata.project_incharge_name}
              </p>
            </div>
          </div>
          <div
            className=" flex m-1"
            style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
          >
            <div className=" w-20 flex justify-center align-items-center">
              <LocationOnIcon style={{ fontSize: 22 }} />
            </div>
            <div className=" w-80 ">
              <small>
                <p style={{ lineHeight: "20px", fontSize: "15px" }}>
                  Address
                </p>
              </small>
              <p style={{ fontSize: "18px" }}>
                {userdata.address}, {userdata.country}
              </p>
            </div>
          </div>
        </div>
        <div
          className=" mt-3 flex justify-evenly p-2"
          style={{ width: "100%", height: "10%" }}
        >
          <Button
            style={{
              width: "45%",
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "10px",
              fontWeight: "bold",
              padding: "3px 3px",
            }}
          >
            Export Projects
          </Button>
          <Button
            style={{
              width: "45%",
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "10px",
              fontWeight: "bold",
              padding: "3px 3px",
            }}
          >
            Export Samples
          </Button>
        </div>
      </div>
        :
        <div style={{ height: "90%" }}>
          <div
            className="flex flex-col align-items-stretch p-3"
            style={{ height: "90%", overflowY: "auto" }}
          >
            
            <TextField
              label="Name" 
              variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto"
              id="username"
              type="text"
              value={userupdatesdata.full_name}
            />
            <TextField
                label="Email"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full mt-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                value={userupdatesdata.email}
              />
              <TextField
                label="Phone Number"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full mt-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phonenumber"
                type="text"
                value={userupdatesdata.phone}
              />
              <TextField
                label="Institute/Organization"
                variant="outlined"
                className="appearance-none  rounded w-full mt-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={userupdatesdata.institution_organization}
              />
              <TextField
                label="Research Department"
                variant="outlined"
                className="appearance-none  rounded w-full mt-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={userupdatesdata.research_department}
              />
              <TextField
                label="Project Incharge"
                variant="outlined"
                className="appearance-none  rounded w-full mt-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={userupdatesdata.project_incharge_name}
              />
              <TextField
                label="Address"
                variant="outlined"
                className="appearance-none  rounded w-full mt-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={userupdatesdata.address}
              />
              <TextField
                label="Country"
                variant="outlined"
                className="appearance-none  rounded w-full mt-4  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={userupdatesdata.country}
              />
            

          
          </div>
          <div
            className=" mt-3 flex p-2 justify-center"
            style={{ width: "100%", height: "10%" }}
          >
            <Button
              onClick={updateprofile}
              style={{
                width: "45%",
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "15px",
                fontWeight: "bold",
                padding: "3px 3px",
              }}
            >
              Approve
            </Button>
          </div>
        </div>
        }
        


      </div>
      <div
        className="m-auto flex flex-column justify-between"
        style={{ width: "70%", height: "95%" }}
      >
        <div
          className=" flex align-items-center"
          style={{ height: "25%", backgroundColor: colors.primary[400] }}
        >
          <Box className=" flex flex-wrap " style={{ width: "100%" }}>
            <Box
              style={{ width: "25%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Statbox2
                title={userdata.credits_remaining}
                subtitle="credits"
                progress={1 - userdata.credits_remaining / 100}
                increase="+14%"
                icon={<PeopleIcon sx={{ color: "green", fontSize: "26px" }} />}
              />
            </Box>
            <Box
              style={{ width: "25%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Statbox2
                title={userdata.project_count}
                subtitle="Projects"
                progress={1 - userdata.project_count / 200}
                increase="+21%"
                icon={<PeopleIcon sx={{ color: "green", fontSize: "26px" }} />}
              />
            </Box>
            <Box
              style={{ width: "25%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Statbox2
                title={userdata.samples_count}
                subtitle="Samples"
                progress={1 - userdata.project_count / 500}
                increase="+5%"
                icon={<PeopleIcon sx={{ color: "green", fontSize: "26px" }} />}
              />
            </Box>
            <Box
              style={{ width: "25%" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Statbox2
                title={userdata.storage_used}
                subtitle="Storage"
                progress={1 - userdata.storage_used / 100}
                increase="+43%"
                icon={<PeopleIcon sx={{ color: "green", fontSize: "26px" }} />}
              />
            </Box>
          </Box>
        </div>
        <Box className="p-2" style={{ height: "72.5%" }}
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
          {!projectSelected ? (
            <DataGrid
              rows={projectdata}
              columns={columns}
              slots={{
                toolbar: GridToolbar,
              }}
              getRowId={getRowId}
            />
          ) : (
            <div style={{ height: "100%" }}>
              <div
                className="flex align-items-center justify-between p-2"
                style={{ height: "10%", width: "100%" }}
              >
                <div
                  className="flex align-items-center py-3"
                  style={{ width: "85%" }}
                >
                  <KeyboardBackspaceIcon
                    onClick={() => setProjectSelected(false)}
                    className="me-2"
                    style={{ fontSize: 30, cursor: "pointer" }}
                  />
                  <h1 style={{ fontSize: 25 }}>{projectName}</h1>
                </div>
                <Button
                  onClick={handlesampleDownload}
                  style={{
                    width: "15%",
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "5px 5px",
                  }}
                >
                  Download Samples
                </Button>
              </div>
              <div className="flex" style={{ height: "90%", width: "100%" }}>
                <DataGrid
                  style={{ width: "60%" }}
                  rows={sampledata}
                  columns={columns2}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                  getRowId={getRowId2}
                />
                <div
                  className="flex flex-col justify-between"
                  style={{ width: "40%" }}
                >
                  <div
                    className=" mx-auto"
                    style={{
                      height: "47.5%",
                      width: "95%",
                      border: "0.5px solid #cccc",
                    }}
                  >
                    <h1
                      style={{ height: "20%" }}
                      className="font-bold p-2 text-xl"
                    >
                      Logs
                    </h1>
                    <Stack
                      className="px-2"
                      sx={{
                        height: "80%",
                        width: "100%",
                        overflow: "hidden",
                        overflowY: "scroll",
                      }}
                      spacing={2}
                    >
                      <Alert severity="error">
                        This is an error alert — check it out!
                      </Alert>
                      <Alert severity="warning">
                        This is a warning alert — check it out!
                      </Alert>
                      <Alert severity="info">
                        This is an info alert — check it out!
                      </Alert>
                      <Alert severity="success">
                        This is a success alert — check it out!
                      </Alert>
                    </Stack>
                  </div>
                  <div
                    className="border rounded mx-auto"
                    style={{ height: "47.5%", width: "95%" }}
                  >
                    <h1
                      style={{ height: "20%" }}
                      className="font-bold p-2 text-xl"
                    >
                      Reports
                    </h1>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sx={{
                        height: "80%",
                        width: "100%",
                        overflow: "hidden",
                        overflowY: "scroll",
                      }}
                    >
                      <List dense={false}>
                        {generate(
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <FolderIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary="Single-line item"
                              secondary={"Secondary text"}
                            />
                          </ListItem>
                        )}
                      </List>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </div>
      <ToastContainer />
    </Box>
  );
};

export default Userprofile;
