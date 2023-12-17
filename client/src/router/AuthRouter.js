import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Dashboard, Login, Home, Signup, VerifyEmail, Error } from "../pages";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute component={<Dashboard />} />}
      />
      <Route path="/user/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
