import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HomeProductos from "./pages/HomeProductos";
import HomeUsuarios from "./pages/HomeUsuarios";
import HomeClasificacion from "./pages/HomeClasificacion";
import HomePaquetes from "./pages/HomePaquetes";
import HomeRemotos from "./pages/HomeRemotos";
import ProductosEdit from "./components/productos/ProductosEdit";
import UsuariosEdit from "./components/usuarios/UsuariosEdit";
import ClasificacionEdit from "./components/clasificacion_paquetes/ClasificacionEdit";
import PaquetesEdit from "./components/deteccion_paquetes/PaquetesEdit";
import RemotosEdit from "./components/datos_remotos/RemotosEdit";
import UsuariosCreate from "./components/usuarios/UsuariosCreate";
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
          <Route path="/informacion" element={<Informacion />} />
        </Route>
        <Route element={<ProtectedRoute role="Administrador" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<HomeProductos />} />
          <Route path="/productos/edit/:id" element={<ProductosEdit />} />
          <Route path="/usuarios" element={<HomeUsuarios />} />
          <Route path="/usuarios/edit/:id" element={<UsuariosEdit />} />
          <Route path="usuarios/create" element={<UsuariosCreate/>}/>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/clasificacion_paquetes" element={<HomeClasificacion />} />
          <Route path="/clasificacion_paquetes/edit/:id" element={<ClasificacionEdit />} />
          <Route path="/deteccion_paquetes" element={<HomePaquetes />} />
          <Route path="/deteccion_paquetes/edit/:id" element={<PaquetesEdit />} />
          <Route path="/remotos" element={<HomeRemotos />} />
          <Route path="/remotos/edit/:id" element={<RemotosEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

