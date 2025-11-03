// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user?.currentUser);
  const location = useLocation();

  // If user not logged in, redirect to login page and remember attempted route
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If logged in, show the protected page
  return children;
};

export default ProtectedRoute;
