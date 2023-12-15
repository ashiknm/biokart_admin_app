import { Box, useTheme, TextField } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { useState, useEffect, useRef } from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";
import { SettingsPowerRounded } from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "@mui/material/Modal";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const errorRef = useRef();

  const [faq, setFaq] = useState([]);

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setOpen(false);

  const getFaq = async () => {
    try {
      const response = await axiosPrivate.get(`/showallfaq`, {
        // signal: controller.signal
      });
      setFaq(response.data);
    } catch (err) {
      console.error(err);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "100vh", // Set maximum height
    overflowY: "auto", // Enable vertical scroll if content overflows
    position: "relative",
  };

  useEffect(() => {
    let isMounted = true;

    isMounted && getFaq();

    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  const handledeleteBoxclick = async (faqId) => {
    const response = await axiosPrivate
      .delete(`/deletefaq/${faqId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        getFaq();
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddFaqq = async () => {
    try {
      console.log("question", question);
      console.log("answer", answer);
      if (!question || !answer) {
        setErrorMsg("please enter all fields");
      } else {
        await axiosPrivate
          .post(
            `/insertfaq`,
            JSON.stringify({
              question: question,
              answer: answer,
            }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then(() => {
            handleClose();
            setQuestion("");
            setAnswer("");
            setErrorMsg("");
            getFaq();
            toast.success("FAQ Added Successfully !!");
          });
      }
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Seerver Rewsponse");
      } else {
        setErrorMsg("an error occured");
      }
      errorRef.current.focus();
    }
  };

  return (
    <Box
      style={{
        height: "90vh",
        overflowY: "scroll",
        padding: "20px",
        position: "relative",
      }}
    >
      <Header title="FAQ" subtitle="Frequently Asked Questions" />

      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="border">
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Add New FAQ
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p
                ref={errorRef}
                aria-live="assertive"
                className={errorMsg ? "p-2 text-sm text-danger" : "hidden"}
              >
                {errorMsg}
              </p>
              <div className="flex flex-column flex-wrap -mx-2">
                <div>
                  <TextField
                    label="Question"
                    variant="outlined"
                    className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    id="question"
                    type="text"
                    placeholder="Enter your Question *"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    label="Answer"
                    variant="outlined"
                    className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="answer"
                    type="text"
                    placeholder="Enter your Answer *"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center  align-items-center mt-4 w-100">
                <button
                  className="btn text-light"
                  style={{ backgroundColor: colors.greenAccent[700] }}
                  onClick={handleAddFaqq}
                >
                  Submit
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}

      <Box
        onClick={handleOpen}
        width="10%"
        m="0 auto"
        p="10px"
        display="flex"
        justifyContent="center"
        backgroundColor={colors.greenAccent[700]}
        borderRadius="4px"
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          cursor: "pointer",
        }}
      >
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          Add Faq
        </Typography>
      </Box>
      {faq.map((item, index) => (
        <Accordion
          key={index}
          defaultExpanded
          style={{ backgroundColor: colors.primary[400] }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
            <div className="flex justify-end p-2">
              <DeleteIcon
                onClick={() => handledeleteBoxclick(item.question_id)}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: colors.redAccent[700],
                }}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <ToastContainer />
    </Box>
  );
};

export default FAQ;
