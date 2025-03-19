import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PaquetesEdit = () => {
  const { id } = useParams(); // Obtener el ID del paquete desde la URL
  const history = useHistory(); // Para redirigir después de guardar los cambios
const [formData, setFormData] = useState({
    Distancia: "",
    Estado: "Detectado",
});

  // Cargar los datos del paquete al editar
useEffect(() => {
    Axios.get(`https://54.208.187.128/detecciones/${id}`)
    .then((response) => {
        setFormData(response.data); // Establecer los datos del paquete en el formulario
    })
    .catch((error) => {
        console.error("Error fetching package data", error);
    });
}, [id]);

  // Función para manejar los cambios en el formulario
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
    ...prevData,
    [name]: value,
    }));
};

  // Función para manejar el envío del formulario (guardar cambios)
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`https://54.208.187.128/detecciones/update/${id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          alert("Paquete actualizado exitosamente");
          history.push("/paquetes"); // Redirigir a la lista de paquetes después de guardar
        }
      })
      .catch((error) => {
        console.error("Error updating package", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Editar Paquete</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Distancia" className="form-label">
            Distancia
          </label>
          <input
            type="number"
            className="form-control"
            id="Distancia"
            name="Distancia"
            value={formData.Distancia}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Estado" className="form-label">
            Estado
          </label>
          <select
            className="form-select"
            id="Estado"
            name="Estado"
            value={formData.Estado}
            onChange={handleChange}
            required
          >
            <option value="Detectado">Detectado</option>
            <option value="No detectado">No detectado</option>
          </select>
        </div>

        <div className="mb-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Guardar cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.push("/paquetes")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaquetesEdit;
