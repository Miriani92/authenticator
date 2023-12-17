import React from "react";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, ...rest }) => {
  // should receive from the context that holds currentUser
  const user = false;
  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Navigate to="/"></Navigate>;
      }}
    ></Route>
  );
};
