import { Box, Button, TextField, Typography, useTheme  } from "@mui/material";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";

import { useState, useRef } from "react";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

import { useSelected } from "../context/SelectedProvider";



import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = '/adminlogin';

const Login = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {setAuth} = useAuth();
  const { setDefaultSelected } = useSelected();


  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const errorRef = useRef();

  const [email_username, resetUser, userAttribs] = useInput('email_username','')
 
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [check, toggleCheck] = useToggle('persist', false);


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({
                email_or_username : email_username,
                password : password
            }),{
                headers : {'Content-Type' : 'application/json'},
                withCredentials: true
            });
            console.log(JSON.stringify(response?.data));
            const accessToken  = response?.data?.accessToken;
            console.log("accessToken from login : ", accessToken);
            const refreshToken  = response?.data?.refreshToken;
            const adminId = response?.data?.adminId;
            const role = response?.data?.role;
            setAuth({adminId,email_username, accessToken, refreshToken, role});
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('adminId', adminId);
            localStorage.setItem('selected', "Dashboard");
            // setEmail_username('');
            resetUser();
            setPassword('');
            setDefaultSelected();
            navigate(from, {replace : true});
    }catch(err){
        if(!err?.response){
            setErrorMsg('No Server Response');
            console.log("error",err);
        }else if(err.response?.status===400){
            setErrorMsg('Missing username or password');
        }else if(err.response?.status===401){
            setErrorMsg('Unauthorized');
        }else {
            setErrorMsg('Login Failed');
        }
        errorRef.current.focus();
    }



    

  };



  return (
    <Box  className="d-flex justify-content-center align-items-center" style = {{width: "100%", height: '100vh'}}>
      {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}
      <div >
      <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
        className="text-center"
      >
        TARGETED METAGENOME ANALYSIS
      </Typography>
      
      <Typography className="text-center m-3" variant="h3" color={colors.greenAccent[400]}>
        from FASTQ to report
      </Typography>
      <Typography className="mt-5" variant="h4" color={colors.grey}>
        Login to continue
      </Typography>
    </Box>

    <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column justiy-content-center   mx-auto p-4">
            <p
            ref={errorRef}
            aria-live="assertive"
            className={errorMsg ? "p-2 text-sm text-danger" : "hidden"}
          >
            {errorMsg}
          </p>
          <div className="py-2 mb-2">
            <TextField  label="Email / Username" variant="filled" type="text" required 
            // value = {email_username} 
            // onChange={(e)=>setEmail_username(e.target.value)}
            {...userAttribs}
             autoComplete="off" style={{width: "100%"}} />
          </div>
          <div className="flex flex-col py-2">
            <TextField
              label="Password"
              variant="filled"
              type="password"
              required
              value = {password} onChange={(e)=>setPassword(e.target.value)}
              style={{width: "100%"}}
            />
          </div>
          <div className="persistCheck">
            <input 
                type="checkbox"
                id = "persist"
                onChange={toggleCheck}
                checked ={check}
            />
            <label htmlFor="persist">Trust This Devise</label>
          </div>
          <button
            className="w-90 my-4 py-2 text-white"
            style={{ backgroundColor: "#24243E" }}
            
          >
            Proceed to my Account
          </button>
          <p className="text-center cursor-pointer ">
            Having Issues with your Password? <span style={{color: "blue", cursor: "pointer"}}>click here</span>
          </p>
            </div>
          
        </form>
      
      {/* <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email / Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
             
              
            </Box>
            <Box display="flex" justifyContent="center" mt="50px">
              <Button className="text-light" type="submit" color="secondary" variant="contained" style={{height : "45px", width : "100px", fontSize : "15px"}} >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik> */}
      </div>

      
    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required")
});
const initialValues = {
  email: "",
  password: ""
};

export default Login;
