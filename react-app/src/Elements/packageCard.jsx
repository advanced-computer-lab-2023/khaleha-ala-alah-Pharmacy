import React from "react";
import "./packageCard.css"; // Assuming you have a CSS file for styling

const PackageCard = ({
  name,
  details = [], // details is an array of objects with 'label' and 'value' keys
  buttonsDetails = [],
}) => {
  return (
    <div className="package-card">
      <h2 className="package-name">{name}</h2>
      {details.map(
        (detail, index) =>
          detail.value &&
          detail.label && ( // Only render the detail if the value is truthy
            <p className="package-details" key={index}>
              {detail.label}: {detail.value}
            </p>
          )
      )}
      <div className="package-buttons">
        {buttonsDetails.map((buttonDetail, index) => (
          <button
            className="subscribe-button"
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

export default PackageCard;
