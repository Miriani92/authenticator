import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FormInput, FormButton, Container } from "../components";
import { handleSignupValidation } from "../utils/handleValidation";
import { useAuthContext } from "../store/authContext";

export const Signup = () => {
  const { setUser, user } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [submitButton, setSubmitButton] = useState({
    active: false,
    isLoading: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData((f) => {
      return { ...f, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitButton((s) => ({ ...s, isLoading: true }));

    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/auth/signup`,
        formData
      );
      setFormData({ name: "", email: "", password: "" });
      if (data?.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("error", error);
      const message = error.response?.data?.message;
      setErrorMessage(message);
    }

    setSubmitButton((s) => ({ ...s, isLoading: false }));
    setFormData({ email: "", password: "", name: "" });
  };

  useEffect(() => {
    const isValid = handleSignupValidation({ ...formData });
    if (isValid) {
      setSubmitButton((s) => ({ ...s, active: true }));
    } else {
      setSubmitButton((s) => ({ ...s, active: false }));
    }
    return () => setSubmitButton({ active: false, isLoading: false });
  }, [formData]);

  return (
    <Container>
      {user && (
        <Navigate
          to="/dashboard"
          replace
          state={{ from: window.location.pathname }}
        />
      )}
      <section className={styles.wrapper}>
        <h2 className={styles.title}>Signup</h2>
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          <FormInput
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Name"
          />
          <FormInput
            name="email"
            type="email"
            Icon={MdOutlineEmail}
            value={formData.email}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Email"
          />
          <FormInput
            name="password"
            type="password"
            Icon={FaRegEyeSlash}
            value={formData.password}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Create Password"
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <FormButton
            isLoading={submitButton.isLoading}
            isActive={submitButton.active}
            onClick={submitButton.active ? handleSubmit : () => null}
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
