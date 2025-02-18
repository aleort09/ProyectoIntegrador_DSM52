import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./components/ChangePassword";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
      <Route path="/recuperar" element={<ChangePassword/>} />
    </Routes>
  </BrowserRouter>
);
