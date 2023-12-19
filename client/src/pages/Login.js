import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FormInput } from "../components/atoms/FormInput";
import { FormButton } from "../components/atoms/FormButton";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Container } from "../components";
import { handleLoginValidation } from "../utils/handleValidation";
import { useAuthContext } from "../store/authContext";

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useAuthContext();
  const [isSubmitButton, setIsSubmitButton] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/auth/login`,
        formData
      );
      if (data?.user) {
        setUser(data.user);
      }
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log("error", error);
      const message = error.response?.data?.message;
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    const isValid = handleLoginValidation({ ...formData });
    if (isValid) {
      setIsSubmitButton(true);
    }
    return () => setIsSubmitButton(false);
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
        <h2 className={styles.title}>Login</h2>
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
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
            Icon={FaRegEyeSlash}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Create Password"
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <FormButton
            isActive={isSubmitButton}
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
