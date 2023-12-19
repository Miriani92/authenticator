import React from "react";
import styles from "./Dashboard.module.css";
import { Chart } from "../components";
import { IoIosAddCircle } from "react-icons/io";
import { useBookContext } from "../store/bookContext";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useAuthContext } from "../store/authContext";
import axios from "axios";

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    user: { _id: id },
    setUser,
  } = useAuthContext();
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
  const handleLogOut = async () => {
    console.log(id);
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/auth/logout/${id}`
    );
    console.log("logged_out:", data?.user, data?.message);
    if (data?.user === null) {
      setUser(data.user);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Book list</h1>
          <button className={styles.logout} onClick={handleLogOut}>
            <CiLogout size={30} color="red" />
          </button>
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
