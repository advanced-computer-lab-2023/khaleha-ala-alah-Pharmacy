import React from "react";
import './AppointmentCard.css';

const AppointmentCard = ({
  name,
  details = [], // details is an array of objects with 'label' and 'value' keys
  buttonsDetails = [],
}) => {
  return (
    <div className="appointment-card">
      <h2 className="appointment-name">{name}</h2>
      {details.map((detail, index) => (
        <p className="appointment-details" key={index}>
          {detail.label}: {detail.value}
        </p>
      ))}
      <div className="appointment-buttons">
        {buttonsDetails.map((buttonDetail, index) => (
          <button
            className="viewdetails-button"
            onClick={buttonDetail.onClick}
            key={index}
          >
            {buttonDetail.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppointmentCard;
