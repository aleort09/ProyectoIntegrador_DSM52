import { useNavigate } from "react-router-dom";
import EventosList from "../components/eventos/EventosList";
import EventosCreate from "../components/eventos/EventosCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomeEventos = () => {
    const navigate = useNavigate();
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = () => {
        axios.get("http://localhost:3000/api/eventos")
            .then(response => setEventos(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded=()=>{
        fetchEventos();
    }
    const handleDeleted=()=>{
        fetchEventos();
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0]; 
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            console.log("Datos del Excel:", jsonData);

            // Enviar los datos al backend
            axios.post("http://localhost:3000/api/eventos/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchEventos(); // Refrescar la lista de usuarios
                })
                .catch(error => console.error("Error al importar eventos:", error));
        };
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Eventos</h1>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                <EventosCreate onEventoAdded={handleAdded} />
                <EventosList eventos={eventos} setEventos={setEventos} onEventoDeleted={handleDeleted}/>
            </div>
        </>
    );
};
export default HomeEventos;