import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import './style.css';
import HomeCarrera from "./pages/HomeCarrera";
import HomeAlumno from "./pages/HomeAlumno";
import HomeGrupo from "./pages/HomeGrupo";
import HomeUniversidad from "./pages/HomeUniversidad";
import AlumnoEdit from "./components/alumnos/AlumnoEdit";
import CarreraEdit from "./components/carreras/CarreraEdit";
import GrupoEdit from "./components/grupos/GrupoEdit";
import UniversidadEdit from "./components/universidades/UniversidadEdit";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />
      <Route path="/recuperar" element={<ChangePassword />} />
    </Routes>
  </BrowserRouter>
);
