import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

import moment from 'moment';


import useAuth from "../../hooks/useAuth";

import Modal from "@mui/material/Modal";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { useState, useEffect } from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";

const Usermessages = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const {auth} = useAuth();

  const [messages, setMessages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [userTimezone, setUserTimezone] = useState(null);
  const [localTime, setLocalTime] = useState(null);

  useEffect(() => {
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(userTimezone);

    // Convert UTC time to local time
    
  }, []);

  const closeModal = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  function convertUtcToLocal(utcString) {
    // Parse the UTC time using moment.utc
    const utcMoment = moment.utc(utcString, "YYYY-MM-DD HH:mm:ss");
  
    // Convert to local time zone
    const localMoment = utcMoment.local();
  
    // Return the formatted local time
    return localMoment.format("DD/MM/YYYY h:mm a");
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: colors.primary[400],
    boxShadow: 24,
    p: 1,
    maxHeight: '100vh', // Set maximum height
    overflowY: 'auto', // Enable vertical scroll if content overflows
  };

  const getMessages = async () => {
    try {
      const response = await axiosPrivate.get(`/showallcontactus`, {
        // signal: controller.signal
      });
       setMessages(response.data);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    let isMounted = true;

    isMounted && getMessages();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  
  
  
  const handleImageClick = async (imageURL) => {
    setSelectedImage(imageURL);
    console.log("imageURL :", imageURL)
    setOpen(true);
  };

  const handlemessageStatus = async (status, contactId)=>{
    const response = await axiosPrivate.put(`/updatecontactus/${contactId}`,
      JSON.stringify({
          status : status
      }),{
          headers : {'Content-Type' : 'application/json'},
          withCredentials: true
      }).then(()=>{
        getMessages();
      })
  }



  const handlecheckBoxclick = (contactId) =>{
      handlemessageStatus("processing", contactId);
  }

  const handledeleteBoxclick = (contactId) =>{
    setSelectedContactId(contactId);
    setDeleteConfirm(true);
  }

  const handlecontactdelete = ()=>{
    handlemessageStatus("resolved", selectedContactId);
    setDeleteConfirm(false);
  }
  





  return (
    <Box style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
      <Header title="Messages" />

      {messages.map((item, index)=>(
            <div key = {index} className=" rounded m-auto p-3 mt-3" style = {{height : "auto", width : "95%", position : "relative", backgroundColor: colors.primary[400]}}>
                <h1 style={{fontSize : "20px", color:colors.greenAccent[400]}}>@{item.user_name}</h1>
                <h1 className="p-3" style={{fontSize : "18px"}}>{item.subject}</h1>
                <p className="p-3" style={{fontSize : "17px"}}>{item.message}</p>
                <div className="flex justify-between mb-2" style = {{height : "40px", width: "100%"}}>
                    <div className="flex align-items-center ms-4" style = {{height : "100%", width: "150px"}}>
                        {item.image_url &&
                            <ImageIcon onClick={() => handleImageClick(item.image_url)} style={{fontSize : "28px", cursor : "pointer"}} />
                        } 
                    </div>
                    <div className="flex justify-evenly align-items-center" style = {{height : "100%", width: "150px"}}>
                        {item.status === "uploaded"?
                            <CheckCircleOutlineIcon onClick = {()=>handlecheckBoxclick(item.contact_id)} style={{fontSize : "28px", cursor : "pointer", color : colors.greenAccent[700]}} />
                        :  <CheckCircleIcon  style={{fontSize : "28px", cursor : "pointer", color : colors.greenAccent[700]}} /> }
                        {auth.role==='["superadmin"]' &&
                        <DeleteIcon onClick={()=>handledeleteBoxclick(item.contact_id)} style={{fontSize : "28px", cursor : "pointer", color : colors.redAccent[700]}} />}
                    </div>
                </div>
                <h1 style={{fontSize : "15px", position : "absolute", top: 15, right: 15}}>UID : {item.user_id}</h1>
                <h1 style={{ fontSize: "15px" }}>
            {convertUtcToLocal(item.contact_date)}
          </h1>
          </div>
          ))
      }

  {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          
        >
          <Box sx={style} >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                
              <div className="flex justify-center  align-items-center  w-100"> 
              {selectedImage && <img style={{height: "500px", width: "100%"}} src={selectedImage} alt="Selected" />}
              </div>
            </Typography>
          </Box>
        </Modal>
      )}

{deleteConfirm && (
        <Modal
          open={deleteConfirm}
          onClose={()=>setDeleteConfirm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
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
            </div>
            <Typography id="modal-modal-title" style={{fontSize : "20px", fontWeight : "bold"}} variant="h6" component="h2">
              Problem Resolved?
            </Typography>
            <Typography id="modal-modal-description" style={{fontSize : "16px"}} sx={{ mt: 2 }}>
              <h1>Are you sure you want to cancel this ticket ?</h1>
              

              <div className="flex justify-between align-items-center mt-4">
              <button
                  type="button"
                  className="btn bg-dark text-light"
                  // data-bs-dismiss="modal"
                  onClick={()=>setDeleteConfirm(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light"
                  // data-bs-dismiss="modal"
                  onClick={handlecontactdelete}
                >
                  Yes
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}


    </Box>
  );
};

export default Usermessages;

