import React, { Children } from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isUserSignedIn = !!localStorage.getItem("token");
  if (!isUserSignedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
