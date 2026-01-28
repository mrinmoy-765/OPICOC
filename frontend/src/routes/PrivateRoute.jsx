import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    <Spinner />;
  }

  if (isAuthenticated && user) {
    return children;
  }
  return <Navigate to="*" />;
};

export default PrivateRoute;
