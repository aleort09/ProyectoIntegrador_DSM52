import React, { useState } from "react";
import Axios from "axios";

const PaquetesCreate = ({ onSave }) => {
  const [formData, setFormData] = useState({
    Distancia: "",
    Estado: "Detectado",
  });

  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); 

    Axios.post("https://54.208.187.128/detecciones/create", formData)
      .then((response) => {
        if (response.status === 201) {
          onSave(); 
          setFormData({
            Distancia: "",
            Estado: "Detectado", 
          });
          alert("Detección de paquete creada exitosamente");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error creating data", error);
        setError("Hubo un problema al crear la detección de paquete. Inténtalo de nuevo.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Distancia:
          <input
            type="number"
            name="Distancia"
            value={formData.Distancia}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Estado:
          <select name="Estado" value={formData.Estado} onChange={handleChange}>
            <option value="Detectado">Detectado</option>
            <option value="No detectado">No detectado</option>
          </select>
        </label>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>} 

      <div>
        <button type="submit" disabled={isLoading}> 
          {isLoading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default PaquetesCreate;
