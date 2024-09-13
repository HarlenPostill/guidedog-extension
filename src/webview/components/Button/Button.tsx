import React from 'react';
import './Button.css';

type ButtonProps = {
  text: string;
  onClick: () => void;
  variant?: 'filled' | 'outlined';
};

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'filled' }) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
