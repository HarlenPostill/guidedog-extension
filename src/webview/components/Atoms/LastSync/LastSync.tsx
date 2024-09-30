import React from 'react';
import './LastSync.css';

const LastSync: React.FC = () => {
  return (
    <div className="lastSync">
      <span className="top">Last Sync:</span>
      <span className="bot">30mins</span>
    </div>
  );
};

export default LastSync;
