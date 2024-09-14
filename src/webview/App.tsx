import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ActionItems from './components/ActionItems/ActionItems';
import AccessibilityScore from './components/AccessibilityScore/AccessibilityScore';

const vscode = acquireVsCodeApi();

const App: React.FC = () => {
  const [width, setWidth] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  // Update width whenever the window is resized for designers
  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        setWidth(divRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <div ref={divRef}>
      <Header title="Welcome to GuideDog" />
      <ActionItems vscode={vscode} />
      <AccessibilityScore score={365} />

      {/* DEV ONLY TO SEE WIDTH */}
      <div style={{ marginTop: '1em', color: '#666' }}>
        Current width: {width}px, Ideal is 343px
      </div>
    </div>
  );
};

export default App;
