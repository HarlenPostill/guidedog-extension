import React from 'react';
import './Link.css';

interface LinkProps {
  name: string;
  action: () => void;
}

const Link = ({ name, action }: LinkProps) => {
  return (
    <button onClick={action} className="link">
      {name}
    </button>
  );
};

export default Link;
