import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components";
import { Dashboard, Login, Home, Signup, Error } from "../pages";
import { EditBook, AddBook, DeleteBook } from "../pages";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="add-book"
        element={
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        }
      />
      <Route
        path="delete-book"
        element={
          <PrivateRoute>
            <DeleteBook />
          </PrivateRoute>
        }
      />
      <Route
        path="edit-book"
        element={
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
