import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Users from "./scenes/users";
import Projects from "./scenes/projects";
import Samples from "./scenes/samples";
import Userapproval from "./scenes/userapproval";
import Generalsettings from "./scenes/generalsettings";
import Creditsandpayment from "./scenes/creditsandpayment";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Userprofile from "./scenes/userprofile";
import Unauthorized from "./scenes/unauthorized";
import Userdetailsapproval from "./scenes/userdetailsapproval";
import Usermessages from "./scenes/usermessages";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Login from "./components/Login";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";

import useAuth from "./hooks/useAuth";

function App() {
  const {auth} = useAuth();
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

 

  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style = {{overflow : "hidden"}}>
          {auth?.accessToken ?
           <Sidebar  isSidebar={isSidebar} />:null
          }
          
          <main className="content" >
            {/* this is for top bar serach bar and settings */}
            {auth?.accessToken &&
           <Topbar setIsSidebar={setIsSidebar} /> 
          }
            
            <Routes>
            <Route path="/" element={<Layout />} >
            
              <Route path="/login" element={<Login />} />

              <Route element = {<PersistLogin/>}>

                 <Route path="/unauthorized" element={<Unauthorized />} />

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin", "manager", "approver"]} />}>  
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
             
                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/users" element={<Users />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", , "admin"]}/>}>  
                  <Route path="/team" element={<Team />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "manager", "admin"]}/>}>  
                  <Route path="/contacts" element={<Contacts />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "manager", "admin"]}/>}>  
                  <Route path="/projects" element={<Projects />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "manager", "admin"]}/>}>  
                  <Route path="/samples" element={<Samples />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "approver"]}/>}>  
                  <Route path="/userapproval" element={<Userapproval />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "approver", "admin"]}/>}>  
                  <Route path="/userdetailsapproval" element={<Userdetailsapproval />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "manager", "admin"]}/>}>  
                  <Route path="/userprofile/:userId" element={<Userprofile />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/generalsettings" element={<Generalsettings />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/creditsandpayment" element={<Creditsandpayment />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/messages" element={<Usermessages />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin"]}/>}>  
                  <Route path="/invoices" element={<Invoices />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin"]}/>}>  
                  <Route path="/form" element={<Form />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/bar" element={<Bar />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/pie" element={<Pie />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/line" element={<Line />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/faq" element={<FAQ />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}>  
                  <Route path="/calendar" element={<Calendar />} />
                </Route>

                <Route element = {<RequireAuth allowedRoles={["superadmin", "admin"]}/>}> 
                  <Route path="/geography" element={<Geography />} />
                </Route>

              </Route>

             
            </Route>
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
