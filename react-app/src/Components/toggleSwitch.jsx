import React from "react";
import styles from "./toggleSwitch.module.css"; // Assume you have a CSS module for styling

const toggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isOn} onChange={handleToggle} />
      <span className={`${styles.slider} ${isOn ? styles.checked : ""}`}></span>
    </label>
  );
};

export default toggleSwitch;
