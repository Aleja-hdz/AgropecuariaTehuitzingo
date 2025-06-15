import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = ({ text, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      className="primary-button"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default PrimaryButton; 