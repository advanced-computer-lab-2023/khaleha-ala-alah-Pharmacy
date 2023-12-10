import React from 'react';
import './Button.css';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
    };
  }

  handleClick = () => {
    this.setState({ isClicked: true });
  };

  render() {
    const { isClicked } = this.state;
    const { label } = this.props; // Accept the label prop

    return (
      <button
        className={`custom-button ${isClicked ? 'clicked' : ''}`}
        onClick={this.handleClick}
      >
        {label} {/* Display the label passed as a prop */}
      </button>
    );
  }
}

export default Button;
