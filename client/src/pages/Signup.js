import React, { useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FormInput, FormButton, Container } from "../components";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => {
      return { ...f, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ email: "", password: "", name: "" });
  };
  return (
    <Container>
      <section className={styles.wrapper}>
        <h2 className={styles.title}>Signup</h2>
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          <FormInput
            name="name"
            value={formData.confirmPassword}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Name"
          />
          <FormInput
            name="email"
            Icon={MdOutlineEmail}
            value={formData.email}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Email"
          />
          <FormInput
            name="password"
            Icon={FaRegEyeSlash}
            value={formData.password}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Create Password"
          />
          <FormButton
            onClick={handleSubmit}
            text="Signup"
            color="#D3EEFA"
            backgroundColor="var(--button-primary)"
          />
        </form>
        <p>
          Already have an Account?{" "}
          <Link to="/login" className={styles.login_link}>
            Login
          </Link>
        </p>
      </section>
    </Container>
  );
};
