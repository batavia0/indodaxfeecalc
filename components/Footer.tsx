
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onViewLicense: () => void;
}

const Footer: React.FC<FooterProps> = ({ onViewLicense }) => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="text-center mt-8 text-gray-500 text-xs">
      <p>{t('footer_copyright', { year: year })}</p>
      <p className="mt-1">
        {t('footer_disclaimer')}
        <button onClick={onViewLicense} className="text-blue-400 hover:underline ml-2 font-semibold">
          {t('footer_viewLicenses')}
        </button>
      </p>
    </footer>
  );
};

export default Footer;
