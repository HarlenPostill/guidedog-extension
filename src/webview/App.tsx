import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css';
import Header from './components/Atoms/Header';
import Tabs from './components/Molecules/Tabs/Tabs';
import RepoDisplay from './components/Templates/RepoDisplay/RepoDisplay';
import ResultsDisplay from './components/Templates/ResultsDisplay/ResultsDisplay';
import SingleDisplay from './components/Templates/SingleDisplay/SingleDisplay';
import { useDictionary } from './hooks/useDictionary';
import StatusIndicator from './components/Molecules/StatusIndicator/StatusIndicator';
import LanguageSelector from './components/Atoms/LanguageSelector/LanguageSelector';
import HistoryDisplay from './components/Templates/HistoryDisplay/HistoryDisplay';
import { getTimePeriodFromNow } from './helpers/timeHelper';

declare const acquireVsCodeApi: () => {
  postMessage: (message: any) => void;
};

const vscode = acquireVsCodeApi();

const App = () => {
  const [width, setWidth] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const [suggestionsData, setSuggestionsData] = useState([]);
  const [historyIssues, setHistoryIssues] = useState([]);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const divRef = useRef<HTMLDivElement>(null);
  const d = useDictionary();

  const fetchHistoryIssues = useCallback(() => {
    vscode.postMessage({ command: 'getHistoryIssues' });
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        setWidth(divRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    vscode.postMessage({ command: 'getSuggestions' });
    fetchHistoryIssues();

    const messageListener = (event: MessageEvent) => {
      const message = event.data;
      switch (message.command) {
        case 'updateSuggestions':
          setSuggestionsData(message.suggestions);
          setLastUpdated(new Date());
          break;
        case 'updateHistoryIssues':
          setHistoryIssues(message.historyIssues);
          break;
      }
    };
    window.addEventListener('message', messageListener);

    return () => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('message', messageListener);
    };
  }, [fetchHistoryIssues]);

  useEffect(() => {
    if (![0, 1, 2].includes(activeTab)) {
      fetchHistoryIssues();
    }
  }, [activeTab, fetchHistoryIssues]);

  useEffect(() => {
    const visibilityListener = () => {
      if (!document.hidden) {
        vscode.postMessage({ command: 'getSuggestions' });
      }
    };
    document.addEventListener('visibilitychange', visibilityListener);
    return () => {
      document.removeEventListener('visibilitychange', visibilityListener);
    };
  }, []);

  const config = useMemo(() => {
    let totalValue = 0;
    let issueCount = 0;

    suggestionsData.forEach((file: any) => {
      file.issues.forEach((issue: any) => {
        issueCount++;
        switch (issue.impact) {
          case 'critical':
            totalValue += 10;
            break;
          case 'serious':
            totalValue += 7;
            break;
          case 'moderate':
            totalValue += 5;
            break;
          case 'minor':
            totalValue += 3;
            break;
        }
      });
    });

    const percentage = Math.min(Math.round((totalValue / issueCount) * 10), 100);

    const timeDiff = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 60000);
    const lastUpdatedString = getTimePeriodFromNow(timeDiff.toString());

    return {
      lastUpdated: lastUpdatedString,
      percentage: percentage,
    };
  }, [suggestionsData, lastUpdated]);

  const isWidthTooSmall = width < 304;

  const handleSetActiveTab = (index: number) => {
    setActiveTab(index);
  };

  const showHistoryView = () => {
    setActiveTab(3);
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
          setActiveTab={handleSetActiveTab}>
          <RepoDisplay
            vscode={vscode}
            switchToSingleDisplay={() => setActiveTab(1)}
            issuesData={suggestionsData}
            showHistoryView={showHistoryView}
          />
          <SingleDisplay
            vscode={vscode}
            issuesData={suggestionsData}
            showHistoryView={showHistoryView}
          />
          <ResultsDisplay vscode={vscode} />
          <HistoryDisplay issuesData={historyIssues} refreshHistory={fetchHistoryIssues} />
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
