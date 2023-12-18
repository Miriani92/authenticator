import React from "react";
import styles from "./FormButton.module.css";

export const FormButton = ({
  isLoading,
  backgroundColor,
  isActive,
  color,
  Icon,
  onClick,
  text,
  borderColor,
  iconColor,
}) => {
  const customStyle = {
    backgroundColor: isActive ? backgroundColor : "var(--button-disabled)",
    border: `2px solid ${borderColor}`,
  };

  const buttonContent = isLoading ? "loading..." : text;

  return (
    <div className={styles.wrapper} style={customStyle}>
      <button onClick={onClick} style={{ color }} className={styles.button}>
        {buttonContent}
      </button>
      {Icon && (
        <div className={styles.icon_wrapper}>
          <Icon size={25} color={iconColor} />
        </div>
      )}
    </div>
  );
};
