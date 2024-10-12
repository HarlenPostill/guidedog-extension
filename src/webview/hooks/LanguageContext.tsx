import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import _ from 'lodash';

type Language = {
  code: string;
  name: string;
};

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  dictionary: { [key: string]: string };
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

const defaultLanguage: Language = { code: 'EN', name: 'English' };

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage ? JSON.parse(savedLanguage) : defaultLanguage;
  });
  const [dictionary, setDictionary] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Load the dictionary for the current language
    import(`../dictionaries/${currentLanguage.code.toLowerCase()}.json`)
      .then(module => setDictionary(module.default))
      .catch(error => console.error('Error loading dictionary:', error));

    // Save the current language to localStorage
    localStorage.setItem('preferredLanguage', JSON.stringify(currentLanguage));
  }, [currentLanguage]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
