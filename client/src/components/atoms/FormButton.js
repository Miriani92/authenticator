import React from "react";
import styles from "./FormButton.module.css";

export const FormButton = ({
  backgroundColor,
  color,
  Icon,
  onClick,
  text,
  borderColor,
  iconColor,
}) => {
  const customStyle = { backgroundColor, border: `2px solid ${borderColor}` };
  return (
    <div className={styles.wrapper} style={customStyle}>
      <button onClick={onClick} style={{ color }} className={styles.button}>
        {text}
      </button>
      {Icon && (
        <div className={styles.icon_wrapper}>
          <Icon size={25} color={iconColor} />
        </div>
      )}
    </div>
  );
};
