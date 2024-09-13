import React from 'react';
import Button from '../Button/Button';
import LastSync from '../LastSync/LastSync';

const SyncData: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <Button
        text="Manual Sync"
        variant="outlined"
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <LastSync />
    </div>
  );
};

export default SyncData;
