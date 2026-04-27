import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Hardcoded false for now to force redirect to /login
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
