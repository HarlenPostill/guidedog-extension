import React from 'react';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return <h1 style={{ width: '100%', textAlign: 'center', color: '#CCC', margin: 0, padding: '10px' }}>{title}</h1>;
};

export default Header;
