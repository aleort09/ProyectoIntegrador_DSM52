import { useState } from "react";
import axios from "axios";

const ClasificacionCreate = () => {
  const [formData, setFormData] = useState({
    ID_Producto: "",
    Etiqueta_Color: "Rojo",
    Accion: "Izquierda",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "https://54.208.187.128/clasificaciones/create",
        formData
      );
      setMessage("Clasificación creada con éxito.");
      setFormData({ ID_Producto: "", Etiqueta_Color: "Rojo", Accion: "Izquierda" });
    } catch (err) {
      setError("Error al crear la clasificación.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Crear Clasificación de Paquete</h2>
      
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">ID Producto:</label>
          <input
            type="number"
            name="ID_Producto"
            value={formData.ID_Producto}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Etiqueta de Color:</label>
          <select
            name="Etiqueta_Color"
            value={formData.Etiqueta_Color}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Rojo">Rojo</option>
            <option value="Verde">Verde</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Acción:</label>
          <select
            name="Accion"
            value={formData.Accion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Izquierda">Izquierda</option>
            <option value="Derecha">Derecha</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Crear Clasificación
        </button>
      </form>
    </div>
  );
};

export default ClasificacionCreate;
