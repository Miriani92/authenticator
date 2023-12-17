import React from "react";
import styles from "./FormInput.module.css";

export const FormInput = ({
  value,
  borderColor,
  onChange,
  name,
  placeHolder,
  Icon,
}) => {
  return (
    <div className={styles.wrapper}>
      <input
        value={value}
        className={styles.input}
        name={name}
        onChange={onChange}
        placeholder={placeHolder}
      />
      {Icon && <Icon size={25} color="#8D8A89" />}
    </div>
  );
};
