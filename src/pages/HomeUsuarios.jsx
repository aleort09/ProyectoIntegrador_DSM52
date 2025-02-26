import { useNavigate } from "react-router-dom";
import UsuariosList from "../components/usuarios/UsuariosList";
import UsuariosCreate from "../components/usuarios/UsuariosCreate";
import { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import Menu from "../components/Menu";

const HomeUsuarios = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        axios.get("http://localhost:3000/api/usuarios")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error(error));
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Usuarios</h1>
                <UsuariosCreate onUsuarioAdded={fetchUsuarios} />
                <UsuariosList usuarios={usuarios} setUsuarios={setUsuarios} />
            </div>
        </>
    );
};
export default HomeUsuarios;
