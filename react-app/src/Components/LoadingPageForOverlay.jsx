import React from "react";
import styles from "./LoadingPageForOverlay.module.css"; // Make sure to create this CSS file

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.loadingCircle}></div>
    </div>
  );
};

export default LoadingPage;
