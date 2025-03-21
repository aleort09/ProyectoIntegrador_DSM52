import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
    const userRole = localStorage.getItem("rol");
    const isAuthenticated = localStorage.getItem("userId");

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Si se especifica un rol y el usuario no está autorizado
    if (role && !role.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
