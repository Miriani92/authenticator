import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./store/authContext";
import { BookContextProvider } from "./store/bookContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthContextProvider>
      <BookContextProvider>
        <App />
      </BookContextProvider>
    </AuthContextProvider>
  </Router>
);
