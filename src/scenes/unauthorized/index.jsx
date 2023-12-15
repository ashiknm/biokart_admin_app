import React from 'react'
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import unauthorizedImg from '../../assets/access_denied.png';

import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

function Unauthorized() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();


    const goBack = () =>{
        localStorage.setItem('selected', "Dashboard");
        navigate("/");
    } 


  return (
    <Box style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
        {/* <Header title="UNAUTHORIZED" /> */}
        <div className='flex flex-column justify-center align-items-center'>
            <img
                  alt="unauthorized"
                  src={unauthorizedImg}
                  style={{ cursor: "pointer", height : "450px", width : "450px"}}
                />
            <Button
                onClick={goBack}
              style={{
                width: "25%",
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "20px"
              }}
            >
              Go Home
            </Button>
        </div>
    </Box>
  )
}

export default Unauthorized;