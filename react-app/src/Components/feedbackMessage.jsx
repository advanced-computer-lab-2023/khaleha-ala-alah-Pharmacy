// FeedbackMessage.js

import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

import "./FeedbackMessage.css";

const FeedbackMessage = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);
  const getClassName = () => {
    switch (type) {
      case "success":
        return "success-message";
      case "error":
        return "error-message";
      case "warning":
        return "warning-message";
      default:
        return "";
    }
  };

  return (
    <div className={`feedback-message ${getClassName()}`}>
      <p>{message}</p>
    </div>
  );
};

FeedbackMessage.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FeedbackMessage;
