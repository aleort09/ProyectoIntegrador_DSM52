import { useNavigate } from "react-router-dom";
import DispositivosList from "../components/dispositivos/DispositivosList";
import DispositivosCreate from "../components/dispositivos/DispositivosCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomeDispositivos = () => {
    const navigate = useNavigate();
    const [dispositivos, setDispositivos] = useState([]);

    useEffect(() => {
        fetchDispositivos();
    }, []);

    const fetchDispositivos = () => {
        axios.get("http://localhost:3000/api/dispositivos")
            .then(response => setDispositivos(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded=()=>{
        fetchDispositivos();
    }
    const handleDeleted=()=>{
        fetchDispositivos();
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
            axios.post("http://localhost:3000/api/dispositivos/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchDispositivos(); // Refrescar la lista de usuarios
                })
                .catch(error => console.error("Error al importar dispositivos:", error));
        };
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Dispositivos</h1>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                <DispositivosCreate onDispositivoAdded={handleAdded} />
                <DispositivosList dispositivos={dispositivos} setDispositivos={setDispositivos} onDispositivoDeleted={handleDeleted}/>
            </div>
        </>
    );
};
export default HomeDispositivos;