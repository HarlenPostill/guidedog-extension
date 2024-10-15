import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Atoms/Header';
import Tabs from './components/Molecules/Tabs/Tabs';
import RepoDisplay from './components/Templates/RepoDisplay/RepoDisplay';
import ResultsDisplay from './components/Templates/ResultsDisplay/ResultsDisplay';
import SingleDisplay from './components/Templates/SingleDisplay/SingleDisplay';
import { useDictionary } from './hooks/useDictionary';
import StatusIndicator from './components/Molecules/StatusIndicator/StatusIndicator';
import LanguageSelector from './components/Atoms/LanguageSelector/LanguageSelector';

declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
};

const vscode = acquireVsCodeApi();

const App = () => {
  const [width, setWidth] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

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

  const dummyData = [
    {
      fileName: 'src/pages/HomePage.tsx',
      issues: [
        {
          location: 13,
          impact: 'moderate',
          type: 'landmark-one-main',
          improvement: '<div className="main w-screen h-screen bg-poke-lemon-yellow">',
        },
        {
          location: 11,
          impact: 'minor',
          type: 'major-aria-issue',
          improvement: '<header className="main w-screen h-screen bg-poke-lemon-yellow">',
        },
        {
          location: 5,
          impact: 'minor',
          type: 'major-aria-issue',
          improvement: '<footer className="main w-screen h-screen bg-poke-lemon-yellow">',
        },
      ],
    },
    {
      fileName: 'src/pages/PokemonPage.tsx',
      issues: [
        {
          location: 12,
          impact: 'serious',
          type: 'page-has-heading-one',
          improvement: "<h1 className='text-4xl mr-4 font-bold'>Pokemon Details</h1>",
        },
        {
          location: 30,
          impact: 'critical',
          type: 'region',
          improvement: "<main className='pt-24 flex flex-col justify-start items-center'>",
        },
      ],
    },
    {
      fileName: 'src/pages/PageNotFound.tsx',
      issues: [
        {
          location: 3,
          impact: 'moderate',
          type: 'landmark-one-main',
          improvement: "<main className='flex flex-col justify-center items-center pt-32'>",
        },
      ],
    },
    {
      fileName: 'src/components/NavBar.tsx',
      issues: [
        {
          location: 1,
          impact: 'critical',
          type: 'region',
          improvement: "<nav className='w-full'>{/* Navbar items */}</nav>",
        },
      ],
    },
  ];

  const isWidthTooSmall = width < 304;
  const config = {
    lastUpdated: '5m ago',
    percentage: 77,
  };

  const switchToSingleDisplay = () => {
    setActiveTab(1); // SingleDisplay is 1
  };

  return (
    <div ref={divRef} className="app-container">
      <div className={`app-content ${isWidthTooSmall ? 'app-content--blurred' : ''}`}>
        <div className="language">
          <LanguageSelector />
        </div>
        <Header title={d('ui.headers.title')} />

        <StatusIndicator percentage={config.percentage} lastUpdated={config.lastUpdated} />
        <Tabs
          headers={[
            `${d('ui.headers.tabTitle1')}`,
            `${d('ui.headers.tabTitle2')}`,
            `${d('ui.headers.tabTitle3')}`,
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}>
          <RepoDisplay
            vscode={vscode}
            switchToSingleDisplay={switchToSingleDisplay}
            issuesData={dummyData}
          />
          <SingleDisplay vscode={vscode} issuesData={dummyData} />
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
