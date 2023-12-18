import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { FormInput } from "../components/atoms/FormInput";
import { FormButton } from "../components/atoms/FormButton";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Container } from "../components";

export const Login = () => {
  const [formData, setFormData] = useState({
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
    setFormData({ email: "", password: "" });
  };
  return (
    <Container>
      <section className={styles.wrapper}>
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          <FormInput
            name="email"
            Icon={MdOutlineEmail}
            value={formData.email}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Email"
          />
          <FormInput
            Icon={FaRegEyeSlash}
            name="password"
            value={formData.password}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Create Password"
          />
          <FormButton
            onClick={handleSubmit}
            text="Login"
            color="#D3EEFA"
            backgroundColor="var(--button-primary)"
          />
        </form>

        <p>
          Don't have an Account?{" "}
          <Link to="/signup" className={styles.login_link}>
            Signup
          </Link>
        </p>
      </section>
    </Container>
  );
};