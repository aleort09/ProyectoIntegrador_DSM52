import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HomeDispositivos from "./pages/HomeDispositivos";
import HomeEventos from "./pages/HomeEventos";
import HomeLecturas from "./pages/HomeLecturas";
import HomeProductos from "./pages/HomeProductos";
import HomeUsuarios from "./pages/HomeUsuarios";
import DispositivosEdit from "./components/dispositivos/DispositivosEdit";
import EventosEdit from "./components/eventos/EventosEdit";
import LecturasEdit from "./components/lecturas/LecturasEdit";
import ProductosEdit from "./components/productos/ProductosEdit";
import UsuariosEdit from "./components/usuarios/UsuariosEdit";
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/login/RegisterForm";
import ChangePassword from "./components/login/ChangePassword";
import Perfil from "./pages/Perfil";
import ProtectedRoute from "./components/ProtectedRoute";
import Informacion from "./components/Informacion";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    ></script>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registrar" element={<RegisterForm />} />
        <Route path="/recuperar" element={<ChangePassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/informacion" element={<Informacion/>}/>
        </Route>
        <Route element={<ProtectedRoute role="Administrador" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dispositivos" element={<HomeDispositivos />} />
          <Route path="/dispositivos/edit/:id" element={<DispositivosEdit />} />
          <Route path="/eventos" element={<HomeEventos />} />
          <Route path="/eventos/edit/:id" element={<EventosEdit />} />
          <Route path="/lecturas" element={<HomeLecturas />} />
          <Route path="/lecturas/edit/:id" element={<LecturasEdit />} />
          <Route path="/productos" element={<HomeProductos />} />
          <Route path="/productos/edit/:id" element={<ProductosEdit />} />
          <Route path="/usuarios" element={<HomeUsuarios />} />
          <Route path="/usuarios/edit/:id" element={<UsuariosEdit />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);