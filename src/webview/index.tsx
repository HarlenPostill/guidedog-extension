import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LanguageProvider } from './hooks/LanguageContext';

// Render your React component
ReactDOM.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById('root')
);
