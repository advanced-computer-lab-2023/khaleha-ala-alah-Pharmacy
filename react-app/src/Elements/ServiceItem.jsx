import React from 'react';
import '../Elements/ServiceItem.css'; // Import the CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FileDoneOutlined, PlusOutlined } from "@ant-design/icons/lib";

const ServiceItem = ({ imgSrc, title, description, navigateTo}) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo); // Navigate to the specified path
  };

  return (
    <div className="service-item" >
      <div className="image-container">
        <img src={imgSrc} alt={title} className="service-image" />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <div className="button-container" >
        <button className="button-Style" onClick={handleClick} >  Details <FileDoneOutlined className="ml-2" /> </button>
      </div>
      
    </div>
  );
};

export default ServiceItem;