import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SelectedProvider } from "./context/SelectedProvider";
import Login from "./components/Login";
import Layout from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <SelectedProvider>
        <Routes>
          <Route path = "/*" element = {<App />} />
          {/* <Route path="/" element={<Layout />} >
            <Route path="/login" element={<Login />} />
          </Route> */}
        </Routes>
      </SelectedProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
