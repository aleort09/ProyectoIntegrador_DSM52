import { useNavigate } from "react-router-dom";
import UsuariosList from "../components/usuarios/UsuariosList";
import UsuariosCreate from "../components/usuarios/UsuariosCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // 📌 Importamos xlsx
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

    const handleAdded = () => {
        fetchUsuarios();
    };

    const handleDeleted = () => {
        fetchUsuarios();
    };

    // 📌 Función para manejar la subida del archivo Excel
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
            axios.post("http://localhost:3000/api/usuarios/importar", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchUsuarios(); // Refrescar la lista de usuarios
                })
                .catch(error => console.error("Error al importar usuarios:", error));
        };
    };

    // 📌 Función para exportar datos a Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(usuarios);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
        XLSX.writeFile(workbook, "usuarios.xlsx");
    };

    return (
        <>
            <Menu />
            <div className="container">
                <h1>Gestión de Usuarios</h1>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                <button onClick={exportToExcel}>Exportar a Excel</button> {/* 📌 Botón de exportación */}
                <UsuariosCreate onUsuarioAdded={handleAdded} />
                <UsuariosList usuarios={usuarios} setUsuarios={setUsuarios} onUsuarioDeleted={handleDeleted} />
            </div>
        </>
    );
};

export default HomeUsuarios;