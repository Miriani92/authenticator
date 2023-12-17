import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error.module.css";

export const Error = () => {
  return (
    <section className={styles.wrapper}>
      <h1>404</h1>
      <h4>page not found</h4>
      <Link to="/" className="btn">
        Back Home
      </Link>
    </section>
  );
};
