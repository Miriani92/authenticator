import React from "react";
import styles from "./BookRow.module.css";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export const BookRow = ({
  no,
  title,
  author,
  published,
  idx,
  _id,
  chooseBookForDelete,
  chooseBookForEdit,
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.no}>{no ? no : <strong>NO</strong>}</div>
      <div className={styles.title}>
        {title ? title : <strong>TITLE</strong>}
      </div>
      <div className={styles.author}>
        {author ? author : <strong>AUTHOR</strong>}
      </div>
      <div className={styles.published}>
        {published ? published : <strong>PUBLISHED YEAR</strong>}
      </div>
      {!_id ? (
        <div className={styles.operation}>
          <strong>Operation</strong>
        </div>
      ) : (
        <div className={styles.operation}>
          <button
            className={styles.edit}
            onClick={() => chooseBookForEdit(_id)}
          >
            <MdEdit
              size={24}
              color="green"
              style={{ backgroundColor: "white" }}
            />
          </button>
          <button
            className={styles.edit}
            onClick={() => chooseBookForDelete(_id)}
          >
            <MdDelete
              size={24}
              color="red"
              style={{ backgroundColor: "white" }}
            />
          </button>
        </div>
      )}
    </section>
  );
};
