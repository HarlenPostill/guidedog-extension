import React from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

interface ActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (action: string, e: React.MouseEvent) => void;
  fileName: string;
  lineNum: number;
}

const ActionDropdown = ({
  isOpen,
  onClose,
  onActionClick,
  fileName,
  lineNum,
}: ActionDropdownProps) => {
  if (!isOpen) return null;

  const handleActionClick = (action: string, e: React.MouseEvent) => {
    onActionClick(action, e);
    onClose();
  };

  // using inline styles for simplicity. its a basic component
  return (
    <div
      className="action-dropdown"
      style={{
        position: 'absolute',
        right: 0,
        top: '100%',
        borderRadius: '5px',
        background: '#242424',
        display: 'inline-flex',
        padding: '5px',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '2px',
        zIndex: 1000,
      }}>
      {['Fix', 'Ignore', 'Navigate'].map(action => (
        <button
          key={action}
          onClick={e => handleActionClick(action, e)}
          style={{
            color: '#CCC',
            fontSize: '12px',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 5px',
            width: '100%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#FF6D6D';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#CCC';
          }}>
          {action}
          {action === 'Navigate' && <ArrowOutwardIcon style={{ width: '16px', height: '16px' }} />}
        </button>
      ))}
    </div>
  );
};

export default ActionDropdown;
