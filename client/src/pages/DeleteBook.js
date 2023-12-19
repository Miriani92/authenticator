import React, { useState } from "react";
import styles from "./DeleteBook.module.css";
import { Container } from "../components";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../store/bookContext";
import { FormButton } from "../components";
import axios from "axios";

export const DeleteBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { deleteBookData, getBooks } = useBookContext();
  console.log(deleteBookData);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/books/delete/${deleteBookData._id}`
      );
      await getBooks();
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
      const message = error.response?.data?.message;
    }
  };
  const handleGoBack = () => {
    navigate("/dashboard");
  };
  return (
    <section className={styles.wrapper}>
      <h2 style={{ marginRight: 16 }}>Do you want to delete this book</h2>
      <div className={styles.button_wrapper}>
        <FormButton
          isLoading={isLoading}
          text="Delete"
          onClick={handleDelete}
          backgroundColor="red"
          isActive={true}
        />
        <FormButton
          isLoading={isLoading}
          text="Go Back"
          onClick={handleGoBack}
          backgroundColor="green"
          isActive={true}
        />
      </div>
    </section>
  );
};
