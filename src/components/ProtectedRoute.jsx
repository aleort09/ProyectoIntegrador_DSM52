import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
    const userRole = localStorage.getItem("rol");
    const isAuthenticated = localStorage.getItem("userId");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Bloquear acceso a rutas de usuario normal para admin/empleado
    const userRoutes = ['/', '/informacion'];
    if (['Administrador', 'Empleado'].includes(userRole) && userRoutes.includes(location.pathname)) {
        return <Navigate to="/dashboard" />;
    }

    // Verificar roles para rutas protegidas
    if (role && !role.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;