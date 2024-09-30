import React from 'react';
import ZoomOutIcon from './icons/ZoomOutIcon';
import InfoIcon from './icons/InfoIcon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof icons;
}

const icons = {
  ZoomOutIcon,
  InfoIcon,
};

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...props} />;
};

export default Icon;
