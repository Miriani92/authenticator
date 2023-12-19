import React, { useState, useEffect } from "react";
import styles from "./EditBook.module.css";
import { useBookContext } from "../store/bookContext";
import { useNavigate } from "react-router-dom";
import { handleBookValidation } from "../utils/handleValidation";
import { FormInput } from "../components";
import { FormButton } from "../components";
import { BASE_URL } from "../constants";
import axios from "axios";

export const EditBook = () => {
  const { editBookData, setEditBookData } = useBookContext();
  console.log("editBookData", editBookData);
  const navigate = useNavigate();
  const { getBooks } = useBookContext();
  const [submitButton, setSubmitButton] = useState({
    active: false,
    isLoading: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published: "",
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
      const { data } = await axios.patch(
        `${BASE_URL}api/v1/books/edit/${editBookData._id}`,
        formData
      );
      await getBooks();
      navigate("/dashboard");
    } catch (error) {
      console.log("error", error);
      const message = error.response?.data?.message;
      setErrorMessage(message);
    }

    setSubmitButton((s) => ({ ...s, isLoading: false }));
    setFormData({ title: "", author: "", published: "" });
  };
  useEffect(() => {
    let book;
    if (editBookData) {
      const { author, title, published } = editBookData;
      book = { author, title, published };
    }
    if (book) {
      setFormData(book);
    }
  }, [editBookData]);

  useEffect(() => {
    const isValid = handleBookValidation({ ...formData });
    if (isValid) {
      setSubmitButton((s) => ({ ...s, active: true }));
    } else {
      setSubmitButton((s) => ({ ...s, active: false }));
    }

    return () => setSubmitButton({ active: false, isLoading: false });
  }, [formData]);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Edit Book</h2>
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
          <FormInput
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Title"
          />
          <FormInput
            name="author"
            type="email"
            value={formData.author}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Author"
          />
          <FormInput
            name="published"
            type="number"
            value={formData.published}
            onChange={handleChange}
            borderColor={"var(--input-color)"}
            placeHolder="Published"
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <FormButton
            isLoading={submitButton.isLoading}
            isActive={submitButton.active}
            onClick={submitButton.active ? handleSubmit : () => null}
            text="Submit"
            color="#D3EEFA"
            backgroundColor="var(--button-primary)"
          />
        </form>
      </div>
    </section>
  );
};
