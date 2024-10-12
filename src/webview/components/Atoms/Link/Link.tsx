import React from 'react';
import './Link.css';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
interface LinkProps {
  name: string;
  hasIcon?: boolean;
  action: () => void;
}

const Link = ({ name, action, hasIcon = false }: LinkProps) => {
  return (
    <div className="link-icon">
      {hasIcon && <ScheduleOutlinedIcon sx={{ fontSize: 14 }} htmlColor="#599CD8" />}
      <button onClick={action} className="link">
        {name}
      </button>
    </div>
  );
};

export default Link;
