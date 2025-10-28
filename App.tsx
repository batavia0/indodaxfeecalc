
import React, { useState } from 'react';
import { License } from './components/License';
import Calculator from './components/Calculator';
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

const AppContent: React.FC = () => {
  const [view, setView] = useState<'calculator' | 'license'>('calculator');

  if (view === 'license') {
    return <License onBack={() => setView('calculator')} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-md mx-auto">
        <Header />
        <Calculator />
        <Footer onViewLicense={() => setView('license')} />
      </div>
    </div>
  );
}

export default App;
