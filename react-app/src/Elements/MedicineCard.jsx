import React from 'react';
import './MedicineCard.css';

class MedicineCard extends React.Component {
  handleClick = () => {
    // Define the behavior when the card is clicked
    console.log('Card clicked!');
  };

  render() {
    const { medicineName, imageUrl } = this.props;

    return (
      <div className="medicine-card" onClick={this.handleClick}>
        <h3>{medicineName}</h3>
        <img src={imageUrl} alt={medicineName} />
      </div>
    );
  }
}

export default MedicineCard;
