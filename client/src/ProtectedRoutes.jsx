import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/ui/Loader";

function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Loader />;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
