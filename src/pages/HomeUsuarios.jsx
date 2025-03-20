import { useNavigate } from "react-router-dom";
import UsuariosList from "../components/usuarios/UsuariosList";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";
import { FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Importación correcta de jspdf-autotable
import Swal from "sweetalert2";

const HomeUsuarios = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [filters, setFilters] = useState({ nombre: '', apellido: '' });

    useEffect(() => {
        fetchUsuarios();
    }, [filters]);

    const fetchUsuarios = () => {
        axios.get("https://54.208.187.128/users", { params: filters })
            .then(response => setUsuarios(response.data))
            .catch(error => console.error(error));
    };

    const handleAdded = () => fetchUsuarios();
    const handleDeleted = () => fetchUsuarios();

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

            axios.post("https://54.208.187.128/importar/usuarios", jsonData)
                .then(response => {
                    Swal.fire({
                        title: "¡Éxito!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    fetchUsuarios();
                })
                .catch(error => {
                    console.error("Error al importar usuarios:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al importar los usuarios.",
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                });
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(usuarios);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
        XLSX.writeFile(workbook, "usuarios.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Usuarios", 10, 10);
        autoTable(doc, { // Usamos autoTable correctamente
            head: [["ID", "Nombre", "Apellido", "Correo", "Teléfono", "Dirección", "Rol", "Fecha de Registro"]],
            body: usuarios.map(user => [
                user.ID_Usuario,
                user.Nombre,
                user.Apellido,
                user.Correo,
                user.Telefono,
                user.Direccion,
                user.Rol,
                new Date(user.Fecha_Registro).toLocaleDateString(),
            ]),
        });
        doc.save("usuarios.pdf");
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    return (
        <div>
            <Menu />
            <div className="p-4" style={{ marginLeft: "10px", marginRight:"10px" }}>
                <h2 className="text-center">Gestión de Usuarios</h2>
                <div className="mb-3">
                    <label className="form-label">Importar usuarios desde Excel</label>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="form-control mb-2"
                    />
                    <div className="d-flex gap-2">
                        <button onClick={exportToExcel} className="btn btn-success flex-grow-1">
                            Exportar a Excel
                        </button>
                        <button onClick={exportToPDF} className="btn btn-danger flex-grow-1">
                            Exportar a PDF
                        </button>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Filtrar por nombre"
                            value={filters.nombre}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Filtrar por apellido"
                            value={filters.apellido}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-4">
                        <button onClick={() => navigate("/usuarios/create")} className="btn btn-primary">
                            <FaPlus /> Crear Usuario
                        </button>
                    </div>
                    {usuarios.length === 0 ? (
                        <div className="alert alert-warning text-center">
                            No hay datos que coincidan con la búsqueda.
                        </div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <UsuariosList
                                usuarios={usuarios}
                                setUsuarios={setUsuarios}
                                onUsuarioDeleted={handleDeleted}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeUsuarios;