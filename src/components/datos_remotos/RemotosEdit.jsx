import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const RemotosEdit = () => {
  const { id } = useParams(); // Obtener el ID del dato a editar desde la URL
  const history = useHistory();

  const [idDeteccion, setIdDeteccion] = useState("");
  const [idClasificacion, setIdClasificacion] = useState("");
  const [estadoConexion, setEstadoConexion] = useState("Exitoso");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Obtener los datos existentes cuando el componente se monta
  useEffect(() => {
    const fetchDato = async () => {
      try {
        const response = await axios.get(`https://54.208.187.128/remotos/${id}`);
        const dato = response.data;
        setIdDeteccion(dato.ID_Deteccion);
        setIdClasificacion(dato.ID_Clasificacion);
        setEstadoConexion(dato.Estado_Conexion);
      } catch (err) {
        console.error("Error al obtener los datos", err);
        setError("Error al obtener los datos. Intenta de nuevo.");
      }
    };

    fetchDato();
  }, [id]);

  // Manejar el envío del formulario para actualizar el dato
  const handleSubmit = async (e) => {
    e.preventDefault();
    const actualizadoDato = {
      ID_Deteccion: idDeteccion,
      ID_Clasificacion: idClasificacion,
      Estado_Conexion: estadoConexion,
    };

    try {
      await axios.put(`https://54.208.187.128/remotos/${id}`, actualizadoDato);
      setMensaje("Dato remoto actualizado correctamente.");
      setTimeout(() => {
        history.push("/remotos"); // Redirigir a la lista de remotos después de actualizar
      }, 2000);
    } catch (err) {
      setError("Error al actualizar el dato remoto. Intenta de nuevo.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Editar Dato Remoto</h2>

      {mensaje && <p className="text-green-600">{mensaje}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="idDeteccion" className="block text-sm font-medium text-gray-700">ID Detección</label>
          <input
            type="number"
            id="idDeteccion"
            value={idDeteccion}
            onChange={(e) => setIdDeteccion(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="idClasificacion" className="block text-sm font-medium text-gray-700">ID Clasificación</label>
          <input
            type="number"
            id="idClasificacion"
            value={idClasificacion}
            onChange={(e) => setIdClasificacion(e.target.value)}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="estadoConexion" className="block text-sm font-medium text-gray-700">Estado de Conexión</label>
          <select
            id="estadoConexion"
            value={estadoConexion}
            onChange={(e) => setEstadoConexion(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="Exitoso">Exitoso</option>
            <option value="Fallido">Fallido</option>
          </select>
        </div>

        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded"
          >
            Actualizar Dato Remoto
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemotosEdit;
