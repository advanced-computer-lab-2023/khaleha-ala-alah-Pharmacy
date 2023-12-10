import React from "react";
import styles from "./overlayWindow.module.css";
import { CloseOutlined } from "@ant-design/icons"; // Importing a close icon from Ant Design

const OverlayWindow = ({ message, onCancel, cancelLabel }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.confirmationBackdrop} onClick={handleBackdropClick}>
      <div className={styles.confirmationDialog}>
        <button
          className={styles.closeButton}
          onClick={() => {
            onCancel();
          }}
        >
          <CloseOutlined /> {/* Close icon */}
        </button>
        <p className={styles.confirmationMessage}>{message}</p>
        <div className={styles.confirmationButtons}>
          <button className={styles.cancel} onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

/*

 ////////// creating of useState and confirm and cancel buttons /////////
 const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    // Handle the confirmation action
    setShowDialog(false);
    setpatients(!showpateints);

  };

  const handleCancel = () => {
    // Handle the cancel action
    setpatients(showpateints);
    setShowDialog(false);
  };

  const handleButton = () => {
    // Toggle the state of patients
    setShowDialog(true);

  };

//////////// calling of the method with useState ///////////////
 </><div>
        {showDialog && (
          <ConfirmationDialog
            message="Are you sure?"
            confirmLabel="Allow"
            cancelLabel="Don't Allow"
            onConfirm={handleConfirm}
            onCancel={handleCancel} />
        )}
      </div></>

*/

export default OverlayWindow;
