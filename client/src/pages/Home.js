import React from "react";
import styles from "./Home.module.css";
import { Navigate } from "react-router-dom";
import { Login } from "./Login";
import { useAuthContext } from "../store/authContext";

export const Home = () => {
  const { user } = useAuthContext();
  return (
    <section className={styles.wrapper}>
      {true && <Navigate to="/dashboard" />}
      <Login />
    </section>
  );
};
