import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import Spinner from "../components/Spinner";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    <Spinner />;
  }

  if (isAuthenticated && user.role === "admin") {
    return children;
  }
  return <Navigate to="*" />;
};

export default AdminRoute;
