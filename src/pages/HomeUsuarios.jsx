import { useNavigate } from "react-router-dom";
import UsuariosList from "../components/usuarios/UsuariosList";
import UsuariosCreate from "../components/usuarios/UsuariosCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Menu from "../components/Menu";

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

    const handleAdded = () => {
        fetchUsuarios();
    };

    const handleDeleted = () => {
        fetchUsuarios();
    };

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

            axios.post("https://54.208.187.128/import/usuarios", jsonData)
                .then(response => {
                    alert(response.data.message);
                    fetchUsuarios();
                })
                .catch(error => console.error("Error al importar usuarios:", error));
        };
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(usuarios);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
        XLSX.writeFile(workbook, "usuarios.xlsx");
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <div>
            <Menu />
            <div
                className="p-4"
                style={{ marginLeft: "250px" }}
            >
                <div className="mb-4">
                    <UsuariosCreate onUsuarioAdded={handleAdded} />
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        className="form-control mb-2"
                    />
                    <button
                        onClick={exportToExcel}
                        className="btn btn-success w-100 mb-3"
                    >
                        Exportar a Excel
                    </button>
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
                <div>
                    <div className="card-body">
                        {usuarios.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No hay datos que coincidan con la búsqueda.
                            </div>
                        ) : (
                            <div style={{ overflowX: "auto" }}> {/* Overflow para la tabla */}
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
        </div>
    );
};

export default HomeUsuarios;