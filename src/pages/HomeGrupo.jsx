import GrupoList from "../components/grupos/GrupoList";
import GrupoForm from "../components/grupos/GrupoForm";
import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../components/menu";

const HomeGrupo = () => {
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        fetchGrupos();
    }, []);

    const fetchGrupos = () => {
        axios.get("http://localhost:3000/api/grupos")
            .then(response => setGrupos(response.data))
            .catch(error => console.error(error));
    };

    const handleGrupoAdded = () => {
        fetchGrupos();
    };

    const handleGrupoDeleted = () => {
        fetchGrupos();
    };

    const navigate = useNavigate();

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Grupos</h1>
                <GrupoForm onGrupoAdded={handleGrupoAdded} />
                <GrupoList grupos={grupos} onGrupoDeleted={handleGrupoDeleted} />
            </div>
        </>
    );
};

export default HomeGrupo;
