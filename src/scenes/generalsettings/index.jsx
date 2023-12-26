import { Box, Typography, useTheme, TextField } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SETTINGS_URL = "/updateSiteSettings";

const Generalsettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [showSetings, setShowSettings] = useState(true);

  const [showPageSetings, setShowPageSettings] = useState(true);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

  const [settingsForm, setSettingsForm] = useState({
      companyName : "",
      darkLogo : null,
      lightLogo : null,
      darkLogoPreview: null,
      lightLogoPreview: null,
      addressLine1 : "",
      addressLine2: "",
      phoneNumber : "",
      emailId : "",
      colorMode : "",
      header1 : "",
      subtitle1 : "",
      contactHeading  :"",
      contactPerson : "",
      pageheader1 : "",
      pageSubtitle1 : "",
      registerBtntxt : "",
      loginBtntxt : ""  
    }
  );

  useEffect(()=>{
    console.log(settingsForm);
  }, [settingsForm])

  const getSettings = async () => {
    try {
      const response = await axiosPrivate.get(`/showallsiteSettings`, {
        // signal: controller.signal
      });
      const mappedData = {
        companyName: response.data.companyName || "",
        darkLogo: response.data.darkLogo || null,
        lightLogo: response.data.lightLogo || null,
        darkLogoPreview: response.data.darkLogo || null,
        lightLogoPreview: response.data.lightLogo || null,
        addressLine1: response.data.addressLine1 || "",
        addressLine2: response.data.addressLine2 || "",
        phoneNumber: response.data.phoneNumber || "",
        emailId: response.data.emailId || "",
        colorMode: response.data.colorMode || "",
        header1: response.data.header1 || "",
        subtitle1: response.data.subtitle1 || "",
        contactHeading: response.data.contactHeading || "",
        contactPerson: response.data.contactPerson || "",
        pageheader1: response.data.pageheader1 || "",
        pageSubtitle1: response.data.pageSubtitle1 || "",
        registerBtntxt: response.data.registerBtntxt || "",
        loginBtntxt: response.data.loginBtntxt || ""
      };
      setSettingsForm(mappedData);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    let isMounted = true;

    isMounted && getSettings();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  const handleChange  =  (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettingsForm({
          ...settingsForm,
          [name]: selectedFile,
          [`${name}Preview`]: reader.result, // Set the preview URL
        });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setSettingsForm({
        ...settingsForm,
        [name]: value,
      });
    }
    
  }

  const saveSettngs = async ()=>{
    const response = await axiosPrivate.put(
      SETTINGS_URL,
      settingsForm,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        method : 'POST',
      }
    );
    getSettings();
    toast.success('Settings updated sucesfully!');
  }

  return (
    <Box m="20px" style={{height: "100vh"}}>
      <Header style={{height: "10%"}} title="General Settings" subtitle="You can configure your general site settings and  options for user from this settings menu. " />
      <div className=" ps-10" style = {{ height: '5%'}}>
      <div   className=" flex justify-end" style = {{width: "700px"}}>
        <Button onClick = {saveSettngs} style= {{backgroundColor: colors.greenAccent[400]}} variant="contained">Save Changes</Button>
      </div>
      </div>
      <div className="ps-10" style={{height: "75%", overflow : 'auto'}}>
      <div className="mb-10"  style={{width: "100%"}}>
      
        <div className="ps-5 pt-2  pe-5 pb-30" style={{width: "700px", position : 'relative', backgroundColor: colors.primary[400]}}>
          {/* <div className="border flex align-items-center justify-evenly" style={{width: '200px', height: '40px', position: 'absolute', right: 0, top: 0}}>
           
           
          </div> */}
          <div className=" flex" style = {{height : '50px', width: '100%'}}>
            <div className=" flex align-items-center" style={{width: '60%'}}>
              <Typography className="mb-2" variant="h3">
                Site Settings :
              </Typography>
            </div>
            <div className=" flex align-items-center justify-evenly" style={{width: '40%'}}>
              <KeyboardArrowDownIcon onClick= {()=>setShowSettings(true)} className="cursor-pointer" style={{fontSize: 35}} />
              <KeyboardArrowUpIcon onClick= {()=>setShowSettings(false)} className="cursor-pointer" style={{fontSize: 35}} />
            </div>
           
          </div>
          <hr className="mb-3"></hr>

          {showSetings &&

            <div>
 <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Company Name :</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "companyName"
              onChange={handleChange}
              value = {settingsForm.companyName}
              // value = {password} onChange={(e)=>setPassword(e.target.value)}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Dark Logo :</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
              <Button className="me-2" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file"  name = "darkLogo"
              onChange={handleChange} />
            </Button>
            {settingsForm.darkLogoPreview && <img src={settingsForm.darkLogoPreview} alt="Dark Logo Preview" style={{ maxWidth: '80px' }} />}
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">White Logo :</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
              <Button className="me-2" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file"  name = "lightLogo"
              onChange={handleChange} />
            </Button>
            {settingsForm.lightLogoPreview && <img src={settingsForm.lightLogoPreview} alt="Dark Logo Preview" style={{ maxWidth: '80px' }} />}
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Address line 1 :</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              
              variant="filled"
              type="text"
              name = "addressLine1"
              onChange={handleChange}
              value = {settingsForm.addressLine1}
              // value = {password} onChange={(e)=>setPassword(e.target.value)}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Address line 2 :</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "addressLine2"
              onChange={handleChange}
              value = {settingsForm.addressLine2}
              
              // required
              // value = {password} onChange={(e)=>setPassword(e.target.value)}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Phone number:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "phoneNumber"
              value = {settingsForm.phoneNumber}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Email Id:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "emailId"
              value = {settingsForm.emailId}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>

          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Colr Mode:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "colorMode"
              onChange={handleChange}
              value = {settingsForm.colorMode}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Header1:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "header1"
              value = {settingsForm.header1}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Subtitle:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "subtitle1"
              value = {settingsForm.subtitle1}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Contact Heading:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "contactHeading"
              value = {settingsForm.contactHeading}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Contact Person:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "contactPerson"
              value = {settingsForm.contactPerson}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
            </div>
          
          }
         
         

        </div>
      </div>

      <div className="mb-10"  style={{width: "100%"}}>
      <div className="ps-5 pt-3 pe-5 pb-30" style={{width: "700px", backgroundColor: colors.primary[400]}}>
      <div className=" flex" style = {{height : '50px', width: '100%'}}>
            <div className=" flex align-items-center" style={{width: '60%'}}>
              <Typography className="mb-2" variant="h3">
                Page Settings :
              </Typography>
            </div>
            <div className=" flex align-items-center justify-evenly" style={{width: '40%'}}>
              <KeyboardArrowDownIcon onClick= {()=>setShowPageSettings(true)} className="cursor-pointer" style={{fontSize: 35}} />
              <KeyboardArrowUpIcon onClick= {()=>setShowPageSettings(false)} className="cursor-pointer" style={{fontSize: 35}} />
            </div>
           
          </div>
          <hr className="mb-3"></hr>

          {showPageSetings &&
              <div>
<div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Page Header1:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "pageheader1"
              value = {settingsForm.pageheader1}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Page Subtitle1:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "pageSubtitle1"
              value = {settingsForm.pageSubtitle1}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Register btn txt:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "registerBtntxt"
              value = {settingsForm.registerBtntxt}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
          <div className=" flex" style = {{height : "60px"}}>
            <div className=" flex align-items-center p-2" style = {{width: '30%'}}>
              <Typography variant="h4">Login btn txt:</Typography>
            </div>
            <div className=" flex align-items-center" style = {{width: '70%'}}>
            <TextField
              // label="company name"
              variant="filled"
              type="text"
              name = "loginBtntxt"
              value = {settingsForm.loginBtntxt}
              onChange={handleChange}
              style={{width: "100%", height: '100%'}}
            />
            </div>
          </div>
              </div>
          }

          
        </div>

        </div>
      </div>

     
     
      <ToastContainer />
    </Box>
  );
};

export default Generalsettings;
