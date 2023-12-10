import React from 'react';
import './ServiceItem.css'; // Import the CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ServiceItem = ({ imgSrc, title, description, navigateTo}) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo); // Navigate to the specified path
  };

  return (
    <div className="service-item" onClick={handleClick}>
      <div className="image-container">
        <img src={imgSrc} alt={title} className="service-image" />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </div>
  );
};

export default ServiceItem;