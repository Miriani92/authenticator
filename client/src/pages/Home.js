import React from "react";
import { Login } from "./Login";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <section className={styles.wrapper}>
      <Login />
    </section>
  );
};
