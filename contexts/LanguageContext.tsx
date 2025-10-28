
import React, { createContext, useState, useContext, ReactNode } from 'react';

const translations = {
  en: {
    header_title: "Indodax Fee Calculator",
    header_description: "This application helps you calculate the total cost of purchasing crypto assets on Indodax, with fee options for Limit and Market orders.",
    language_switcher_label: "Language:",
    calculator_totalBalanceLabel: "Your Total Balance (IDR)",
    calculator_customPercentagePlaceholder: "Custom",
    calculator_purchaseAmountLabel: "Purchase Amount (IDR)",
    calculator_decreaseAriaLabel: "Decrease",
    calculator_increaseAriaLabel: "Increase",
    calculator_orderTypeLabel: "Order Type",
    calculator_limitOrder: "Limit (Maker)",
    calculator_marketOrder: "Market (Taker)",
    calculator_totalPayment: "Total Payment",
    calculator_netPurchaseAmount: "Net Purchase Amount",
    calculator_platformFee: "Platform Fee ({feePercentage})",
    footer_copyright: "© {year} batavia0. Released under the MIT License",
    footer_disclaimer: "Built with React & Tailwind CSS. This is an unofficial tool and is not affiliated with Indodax.",
    footer_viewLicenses: "View Licenses",
    license_title: "Library Licenses",
    license_description: "This application is built using the following open-source libraries.",
    license_viewLicenseLink: "View License",
    license_backButton: "← Back"
  },
  id: {
    header_title: "Kalkulator Fee Indodax",
    header_description: "Aplikasi ini membantu Anda menghitung total biaya pembelian aset kripto di Indodax, dengan pilihan biaya untuk order Limit dan Market.",
    language_switcher_label: "Bahasa:",
    calculator_totalBalanceLabel: "Total Saldo Anda (IDR)",
    calculator_customPercentagePlaceholder: "Custom",
    calculator_purchaseAmountLabel: "Jumlah Pembelian (IDR)",
    calculator_decreaseAriaLabel: "Kurangi",
    calculator_increaseAriaLabel: "Tambah",
    calculator_orderTypeLabel: "Tipe Order",
    calculator_limitOrder: "Limit (Maker)",
    calculator_marketOrder: "Market (Taker)",
    calculator_totalPayment: "Total Pembayaran",
    calculator_netPurchaseAmount: "Jumlah Pembelian (Bersih)",
    calculator_platformFee: "Biaya Platform ({feePercentage})",
    footer_copyright: "© {year} batavia0. Released under the MIT License",
    footer_disclaimer: "Dibuat dengan React & Tailwind CSS. Ini adalah alat tidak resmi dan tidak berafiliasi dengan Indodax.",
    footer_viewLicenses: "Lihat Lisensi",
    license_title: "Lisensi Pustaka",
    license_description: "Aplikasi ini dibuat menggunakan pustaka sumber terbuka berikut.",
    license_viewLicenseLink: "Lihat Lisensi",
    license_backButton: "← Kembali"
  }
};

type Language = 'en' | 'id';
type Translations = typeof translations.en;
type TranslationKey = keyof Translations;


interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: TranslationKey, replacements?: Record<string, string | number>) => {
    let translation = translations[language][key] || key;
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
        });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
