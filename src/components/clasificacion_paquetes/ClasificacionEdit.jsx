import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ClasificacionEdit = () => {
  const { classification_id } = useParams();

  const [formData, setFormData] = useState({
    ID_Producto: "",
    Etiqueta_Color: "Rojo",
    Accion: "Izquierda",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://54.208.187.128/clasificaciones/${classification_id}`
        );
        setFormData(response.data);
      } catch (err) {
        setError("Error al cargar la clasificación.");
      }
    };
    fetchData();
  }, [classification_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.put(
        `https://54.208.187.128/clasificaciones/edit/${classification_id}`,
        formData
      );
      setMessage("Clasificación actualizada con éxito.");
    } catch (err) {
      setError("Error al actualizar la clasificación.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Editar Clasificación de Paquete</h2>

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
          Actualizar Clasificación
        </button>
      </form>
    </div>
  );
};

export default ClasificacionEdit;
