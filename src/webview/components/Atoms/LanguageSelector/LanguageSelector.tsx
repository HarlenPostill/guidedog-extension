import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguage } from '../../../hooks/LanguageContext';
import './languageDropdown.css';

const languages = [
  { code: 'EN', name: 'English' },
  { code: 'VI', name: 'Vietnamese' },
  { code: 'KO', name: 'Korean' },
  { code: 'MS', name: 'Malay' },
];

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (language: { code: string; name: string }) => {
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="languageDropdownContainer">
      <div className="languageDropdown" onClick={toggleDropdown}>
        <LanguageIcon style={{ width: '12px', height: '12px' }} />
        <span>{currentLanguage.code}</span>
      </div>
      {isOpen && (
        <div className="languageDropdownList">
          {languages.map(language => (
            <div
              key={language.code}
              className="languageDropdownItem"
              onClick={() => selectLanguage(language)}>
              {language.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
