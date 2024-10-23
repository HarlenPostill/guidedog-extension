import React from 'react';
import './Button.css';

type ButtonProps = {
  text: string;
  onClick: () => void;
  variant?: 'filled' | 'outlined';
  className?: string;
};

const Button = ({ className='' , text, onClick, variant = 'filled' }: ButtonProps) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
