import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [editBookData, setEditBookData] = useState();
  const [deleteBookData, setDeleteBookData] = useState();

  const getBooks = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/v1/books`);
      if (data?.books) {
        setBooks(data.books);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);
  console.log(books);
  return (
    <BookContext.Provider
      value={{
        books,
        getBooks,
        setDeleteBookData,
        deleteBookData,
        editBookData,
        setEditBookData,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  return context;
};
