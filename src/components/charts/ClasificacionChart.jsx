import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const ClasificacionChart = () => {
  const [clasificaciones, setClasificaciones] = useState([]);

  useEffect(() => {
    fetchClasificaciones();
  }, []);

  const fetchClasificaciones = async () => {
    try {
      const response = await axios.get("http://localhost:5000/clasificacion_paquetes");
      setClasificaciones(response.data);
    } catch (err) {
      console.error("Error al obtener clasificaciones", err);
    }
  };

  // Procesar datos para gráfico de barras (cantidad por color)
  const etiquetasContadas = clasificaciones.reduce((acc, item) => {
    acc[item.Etiqueta_Color] = (acc[item.Etiqueta_Color] || 0) + 1;
    return acc;
  }, {});

  const dataBarras = Object.keys(etiquetasContadas).map((color) => ({
    name: color,
    cantidad: etiquetasContadas[color],
  }));

  // Procesar datos para gráfico de pastel (proporción de acciones)
  const accionesContadas = clasificaciones.reduce((acc, item) => {
    acc[item.Accion] = (acc[item.Accion] || 0) + 1;
    return acc;
  }, {});

  const dataPie = Object.keys(accionesContadas).map((accion) => ({
    name: accion,
    value: accionesContadas[accion],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Gráficas de Clasificación</h2>

      {/* Gráfico de Barras */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Clasificaciones por Color</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataBarras}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Pastel */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Distribución de Acciones</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={dataPie} cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" dataKey="value" label>
              {dataPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClasificacionChart;
