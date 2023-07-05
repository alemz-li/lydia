import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <p className="text-red-500">Loading ...</p>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
