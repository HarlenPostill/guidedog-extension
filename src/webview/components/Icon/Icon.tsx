import React, { FC } from 'react';
import ZoomOutIcon from './icons/ZoomOutIcon';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof icons;
}

const icons = {
  ZoomOutIcon,
};

const Icon: FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...props} />;
};

export default Icon;
