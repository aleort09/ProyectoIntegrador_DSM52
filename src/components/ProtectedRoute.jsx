import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
    const userRole = localStorage.getItem("rol");
    const isAuthenticated = localStorage.getItem("userId");

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;