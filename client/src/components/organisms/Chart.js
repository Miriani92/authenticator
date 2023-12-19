import React from "react";
import { BookRow } from "../molecules/BookRow";
import { useNavigate } from "react-router-dom";

export const Chart = ({ books, handleDeleteBook, handleEditBook }) => {
  const navigate = useNavigate();
  const chooseBookForDelete = (id) => {
    const [book] = books.filter((book) => book._id === id);
    handleDeleteBook(book);
    navigate("/delete-book");
  };
  const chooseBookForEdit = (id) => {
    const [book] = books.filter((book) => book._id === id);
    handleEditBook(book);
    navigate("/edit-book");
  };

  return (
    <section>
      <BookRow />
      {books.map((book, idx) => {
        return (
          <BookRow
            no={idx + 1}
            {...book}
            key={idx}
            chooseBookForDelete={chooseBookForDelete}
            chooseBookForEdit={chooseBookForEdit}
          />
        );
      })}
    </section>
  );
};
