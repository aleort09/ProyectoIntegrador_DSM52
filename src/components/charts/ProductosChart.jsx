import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const ProductosChart = ({ productos }) => {
    // Colores para el gráfico de pastel
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Estadísticas de Productos</h3>

            <div className="row">
                {/* 📊 Gráfico de Barras */}
                <div className="col-md-6">
                    <h5 className="text-center">Stock de Productos</h5>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={productos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="Nombre" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Stock" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* 🍩 Gráfico de Pastel */}
                <div className="col-md-6">
                    <h5 className="text-center">Distribución de Productos</h5>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie 
                                data={productos} 
                                dataKey="Stock" 
                                nameKey="Nombre" 
                                cx="50%" 
                                cy="50%" 
                                outerRadius={80} 
                                label
                            >
                                {productos.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ProductosChart;
