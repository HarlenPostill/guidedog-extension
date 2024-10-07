import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Atoms/Header';
import Tabs from './components/Molecules/Tabs/Tabs';
import RepoDisplay from './components/Templates/RepoDisplay/RepoDisplay';
import ResultsDisplay from './components/Templates/ResultsDisplay/ResultsDisplay';
import SingleDisplay from './components/Templates/SingleDisplay/SingleDisplay';
import { useDictionary } from './hooks/useDictionary';
import StatusIndicator from './components/Molecules/StatusIndicator/StatusIndicator';

const vscode = acquireVsCodeApi();

const App = () => {
  const [width, setWidth] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const d = useDictionary();

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

  const isWidthTooSmall = width < 304;

  return (
    <div ref={divRef} className="app-container">
      <div className={`app-content ${isWidthTooSmall ? 'app-content--blurred' : ''}`}>
        <Header title={d('ui.headers.title')} />
        <StatusIndicator/>
        <Tabs
          headers={[
            `${d('ui.headers.tabTitle1')}`,
            `${d('ui.headers.tabTitle2')}`,
            `${d('ui.headers.tabTitle3')}`,
          ]}>
          <RepoDisplay vscode={vscode} />
          <SingleDisplay vscode={vscode} />
          <ResultsDisplay vscode={vscode} />
        </Tabs>
        <div className="dev-width-display">Current width: {width}px, Ideal is 343px</div>
      </div>
      {isWidthTooSmall && (
        <div className="width-overlay">
          <p className="width-overlay__message">{d('ui.errors.widthSmall')}</p>
        </div>
      )}
    </div>
  );
};

export default App;
