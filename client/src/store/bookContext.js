import React, { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  return (
    <BookContext.Provider value={{ books }}>{children}</BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  return context;
};
