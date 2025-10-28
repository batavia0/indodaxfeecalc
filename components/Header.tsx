
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="text-center mb-8 relative">
      <div className="absolute top-0 right-0 flex items-center space-x-2">
        <span className="text-xs text-gray-400">{t('language_switcher_label')}</span>
        <button 
          onClick={() => setLanguage('id')}
          className={`px-2 py-1 text-xs rounded-md transition-colors ${language === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          aria-pressed={language === 'id'}
        >
          ID
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className={`px-2 py-1 text-xs rounded-md transition-colors ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          aria-pressed={language === 'en'}
        >
          EN
        </button>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-blue-400 pt-8">{t('header_title')}</h1>
      <p className="text-gray-400 mt-2">
        {t('header_description')}
      </p>
    </header>
  );
};

export default Header;
