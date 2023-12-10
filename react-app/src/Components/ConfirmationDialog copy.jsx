import React from "react";
import "./ConfirmationDialog.css";

const ConfirmationDialog = ({
  message,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
}) => {
  return (
    <div className="confirmation-backdrop">
      <div className="confirmation-dialog">
        <p className="confirmation-message">{message}</p>
        <div className="confirmation-buttons">
          <button className="confirm" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button className="cancel" onClick={onCancel}>
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

export default ConfirmationDialog;
