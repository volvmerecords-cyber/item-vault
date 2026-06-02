import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ children, adminOnly = false }) {
  const { isLoggedIn, isAdmin } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/services" replace />;
  }

  return children;
}

export default RequireAuth;
