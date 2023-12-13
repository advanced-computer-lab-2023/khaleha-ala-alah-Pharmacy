import React from "react";
import styles from "./separator.module.css"; // Import the CSS file for styling

const Separator = () => {
  return (
    <>
      <div className={styles.separatorDiv}>
        <div className={styles.separatorOfAdmin}></div>
      </div>
    </>
  );
};

export default Separator;
