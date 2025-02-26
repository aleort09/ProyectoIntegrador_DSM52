import { useNavigate } from "react-router-dom";
import LecturasList from "../components/lecturas/LecturasList";
import LecturasCreate from "../components/lecturas/LecturasCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

const HomeLecturas = () => {
    const navigate = useNavigate();
    const [lecturas, setLecturas] = useState([]);

    useEffect(() => {
        fetchLecturas();
    }, []);

    const fetchLecturas = () => {
        axios.get("http://localhost:3000/api/lecturas_sensores")
            .then(response => setLecturas(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded=()=>{
        fetchLecturas();
    }
    const handleDeleted=()=>{
        fetchLecturas();
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
            axios.post("http://localhost:3000/api/lecturas_sensores/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchLecturas(); // Refrescar la lista de usuarios
                })
                .catch(error => console.error("Error al importar lecturas:", error));
        };
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Lecturas</h1>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                <LecturasCreate onLecturaAdded={handleAdded} />
                <LecturasList lecturas={lecturas} setLecturas={setLecturas} onLecturaDeleted={handleDeleted}/>
            </div>
        </>
    );
};
export default HomeLecturas;
