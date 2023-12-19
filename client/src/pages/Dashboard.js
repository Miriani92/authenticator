import React from "react";
import styles from "./Dashboard.module.css";
import { Chart } from "../components";
import { IoIosAddCircle } from "react-icons/io";
import { useBookContext } from "../store/bookContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { books, setEditBookData, setDeleteBookData } = useBookContext();

  const handleEditBook = (book) => {
    setEditBookData(book);
  };
  const handleDeleteBook = (book) => {
    setDeleteBookData(book);
  };

  const handleAddBook = () => {
    navigate("/add-book");
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Book list</h1>
          <button className={styles.icon_wrapper} onClick={handleAddBook}>
            <IoIosAddCircle size={38} color="green" />
          </button>
        </div>
        <Chart
          books={books}
          handleDeleteBook={handleDeleteBook}
          handleEditBook={handleEditBook}
        />
      </div>
    </section>
  );
};
