import React from 'react';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default Header;
