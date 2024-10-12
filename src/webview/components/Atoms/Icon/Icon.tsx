import React from 'react';
import Paw from './icons/Paw';
import RefreshIcon from './icons/RefreshIcon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof icons;
}

const icons = {
  Paw,
  RefreshIcon,
};

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...props} />;
};

export default Icon;
