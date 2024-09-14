import React from 'react';
import Divider from '../Divider/Divider';

const AccessibilityScore = () => {
  return (
    <div
      style={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15,
        display: 'inline-flex',
        marginBottom: '0.67em'
      }}
    >
      <div
        style={{
          color: '#CCCCCC',
          fontSize: 18,
          fontWeight: '700',
          wordWrap: 'break-word'
        }}
      >
        Accessibility Score:
      </div>

      <div
        style={{
          color: '#71BBFF',
          fontWeight: '700',
          wordWrap: 'break-word',
          fontSize: '19vw'
        }}
      >
        365/400
      </div>
      <Divider />
    </div>
  );
};

export default AccessibilityScore;
