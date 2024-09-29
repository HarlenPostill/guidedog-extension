import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import { useDictionary } from './hooks/useDictionary';
import Tabs from './components/Tabs/Tabs';
import RepoDisplay from './components/Templates/RepoDisplay/RepoDisplay';
import SingleDisplay from './components/Templates/SingleDisplay/SingleDisplay';
import ResultsDisplay from './components/Templates/ResultsDisplay/ResultsDisplay';

const vscode = acquireVsCodeApi();

const App: React.FC = () => {
  const [width, setWidth] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const d = useDictionary();

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
      <Header title={d('ui.headers.title')} />
      <Tabs headers={['Whole Repo', 'Single File', 'Results']}>
        <RepoDisplay vscode={vscode} />
        <SingleDisplay vscode={vscode} />
        <ResultsDisplay vscode={vscode} />
      </Tabs>

      {/* DEV ONLY TO SEE WIDTH */}
      <div style={{ marginTop: '1em', color: '#666' }}>
        Current width: {width}px, Ideal is 343px
      </div>
    </div>
  );
};

export default App;
