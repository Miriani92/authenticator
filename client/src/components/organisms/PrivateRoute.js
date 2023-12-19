import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";

export const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuthContext();
  return true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};
