
import React, { useState, useMemo, useEffect } from 'react';
import { PlusIcon, MinusIcon } from './Icons';
import { FEERATELIMIT, FEE_PERCENTAGE_LIMIT, FEERATEMARKET, FEE_PERCENTAGE_MARKET } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

type OrderType = 'limit' | 'market';

const Calculator: React.FC = () => {
  const { t } = useLanguage();
  const [totalBalance, setTotalBalance] = useState<string>('1000000');
  const [purchaseAmount, setPurchaseAmount] = useState<string>('100000');
  const [customPercentage, setCustomPercentage] = useState<string>('10');
  const [orderType, setOrderType] = useState<OrderType>('limit');

  useEffect(() => {
    console.log(`Jumlah pembelian diubah menjadi: ${purchaseAmount}`);
  }, [purchaseAmount]);

  const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setter(value);
  };

  const calculateAmountFromPercentage = (percentage: string) => {
    const numericPercentage = parseFloat(percentage);
    if (isNaN(numericPercentage) || numericPercentage < 0) {
      return;
    }
    const numericBalance = parseFloat(totalBalance) || 0;
    const newAmount = (numericBalance * numericPercentage) / 100;
    setPurchaseAmount(String(Math.floor(newAmount)));
  };

  const handlePercentageSelect = (percentage: number) => {
    setCustomPercentage(String(percentage));
    calculateAmountFromPercentage(String(percentage));
  };

  const handleCustomPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (parseFloat(value) > 100) {
        setCustomPercentage('100');
        calculateAmountFromPercentage('100');
    } else {
        setCustomPercentage(value);
        if (value) {
          calculateAmountFromPercentage(value);
        }
    }
  };

  const adjustPurchaseAmount = (direction: 'increment' | 'decrement') => {
    const numericAmount = parseFloat(purchaseAmount) || 0;
    let step = 1000;

    if (numericAmount > 0) {
      const orderOfMagnitude = Math.pow(10, Math.floor(Math.log10(numericAmount)));
      step = orderOfMagnitude / 10;
      if (step < 1) step = 1;
    }

    let newAmount = direction === 'increment' ? numericAmount + step : numericAmount - step;
    
    setPurchaseAmount(String(Math.max(0, Math.floor(newAmount))));
    setCustomPercentage(''); 
  };

  const { fee, totalCost, amountForCoin, feePercentage } = useMemo(() => {
    const numericPurchaseAmount = parseFloat(purchaseAmount) || 0;
    
    const feeRate = orderType === 'limit' ? FEERATELIMIT : FEERATEMARKET;
    const currentFeePercentage = orderType === 'limit' ? FEE_PERCENTAGE_LIMIT : FEE_PERCENTAGE_MARKET;

    const calculatedAmountForCoin = numericPurchaseAmount;
    const calculatedFee = calculatedAmountForCoin * feeRate;
    const calculatedTotalCost = calculatedAmountForCoin + calculatedFee;

    return { 
        fee: calculatedFee, 
        totalCost: calculatedTotalCost, 
        amountForCoin: calculatedAmountForCoin,
        feePercentage: currentFeePercentage
    };
  }, [purchaseAmount, orderType]);
  
  const percentageOptions = [10, 25, 50, 100];

  return (
    <main className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
      
      <div>
        <label htmlFor="totalBalance" className="block text-sm font-medium text-gray-300 mb-2">{t('calculator_totalBalanceLabel')}</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">Rp</span>
          <input
            type="text"
            id="totalBalance"
            value={new Intl.NumberFormat('id-ID').format(parseFloat(totalBalance) || 0)}
            onChange={handleNumericInputChange(setTotalBalance)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="0"
            inputMode="numeric"
          />
        </div>
      </div>
      
      <div className="flex justify-center gap-2 flex-wrap items-center">
        {percentageOptions.map((percentage) => (
          <button
            key={percentage}
            onClick={() => handlePercentageSelect(percentage)}
            className={`px-4 py-2 text-sm rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${customPercentage === String(percentage) ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {percentage}%
          </button>
        ))}
        <div className="relative">
            <input
                type="text"
                value={customPercentage}
                onChange={handleCustomPercentageChange}
                className="w-24 bg-gray-700 border border-gray-600 rounded-full py-2 px-4 text-center text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder={t('calculator_customPercentagePlaceholder')}
                inputMode="decimal"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 pointer-events-none">%</span>
        </div>
      </div>

      <div>
        <label htmlFor="purchaseAmount" className="block text-sm font-medium text-gray-300 mb-2">{t('calculator_purchaseAmountLabel')}</label>
        <div className="flex items-center space-x-2">
            <button 
              onClick={() => adjustPurchaseAmount('decrement')} 
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200"
              aria-label={t('calculator_decreaseAriaLabel')}
            >
              <MinusIcon className="w-5 h-5"/>
            </button>
            <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">Rp</span>
                <input
                    type="text"
                    id="purchaseAmount"
                    value={new Intl.NumberFormat('id-ID').format(parseFloat(purchaseAmount) || 0)}
                    onChange={(e) => {
                        handleNumericInputChange(setPurchaseAmount)(e);
                        setCustomPercentage('');
                    }}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="0"
                    inputMode="numeric"
                />
            </div>
            <button 
              onClick={() => adjustPurchaseAmount('increment')} 
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition duration-200"
              aria-label={t('calculator_increaseAriaLabel')}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
        </div>
      </div>
      
      <div className="border-t border-gray-700"></div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3 text-center">{t('calculator_orderTypeLabel')}</label>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setOrderType('limit')}
            className={`w-full py-3 text-sm font-bold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${orderType === 'limit' ? 'bg-blue-600 text-white ring-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
            {t('calculator_limitOrder')}
          </button>
          <button 
            onClick={() => setOrderType('market')}
            className={`w-full py-3 text-sm font-bold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${orderType === 'market' ? 'bg-blue-600 text-white ring-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}>
            {t('calculator_marketOrder')}
          </button>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-4 space-y-3 text-center border border-gray-700">
        <p className="text-gray-300 font-semibold">{t('calculator_totalPayment')}</p>
        <p className="text-3xl font-bold text-blue-400 tracking-wider font-mono">{formatCurrency(totalCost)}</p>
        <div className="border-t border-gray-700 my-2"></div>
        <p className="text-gray-400">{t('calculator_netPurchaseAmount')}</p>
        <p className="text-xl font-mono">{formatCurrency(amountForCoin)}</p>
        <p className="text-gray-400 text-sm">{t('calculator_platformFee', { feePercentage: feePercentage })}</p>
        <p className="text-sm font-mono">{formatCurrency(fee)}</p>
      </div>
    </main>
  );
};

export default Calculator;
