
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LicenseProps {
  onBack: () => void;
}

const libraries = [
  { name: 'React', license: 'MIT License', url: 'https://github.com/facebook/react/blob/main/LICENSE' },
  { name: 'ReactDOM', license: 'MIT License', url: 'https://github.com/facebook/react/blob/main/LICENSE' },
  { name: 'Tailwind CSS', license: 'MIT License', url: 'https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE' },
];

export const License: React.FC<LicenseProps> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-400">{t('license_title')}</h1>
          <p className="text-gray-400 mt-2">
            {t('license_description')}
          </p>
        </header>
        <main>
          <ul className="space-y-3">
            {libraries.map((lib) => (
              <li key={lib.name} className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center border border-gray-600">
                <div>
                  <h2 className="font-semibold text-lg text-gray-200">{lib.name}</h2>
                  <p className="text-sm text-gray-400">{lib.license}</p>
                </div>
                <a
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                  aria-label={`View license for ${lib.name}`}
                >
                  {t('license_viewLicenseLink')}
                </a>
              </li>
            ))}
          </ul>
        </main>
        <footer className="mt-8 text-center">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {t('license_backButton')}
          </button>
        </footer>
      </div>
    </div>
  );
};
