"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SAR", symbol: "ر.س", name: "Saudi Riyal", flag: "🇸🇦" },
];

export const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  CAD: 0.016,
  AUD: 0.018,
  JPY: 1.8,
  SGD: 0.016,
  AED: 0.044,
  SAR: 0.045,
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState(exchangeRates);

  // Convert amount from INR to selected currency
  const convertCurrency = (amountInINR) => {
    if (currency === "INR") return amountInINR;
    return (amountInINR * rates[currency]).toFixed(2);
  };

  // Get currency symbol
  const getSymbol = () => {
    return currencies.find(c => c.code === currency)?.symbol || "₹";
  };

  // Get currency info
  const getCurrencyInfo = () => {
    return currencies.find(c => c.code === currency);
  };

  // Format price with currency
  const formatPrice = (amountInINR) => {
    const converted = convertCurrency(amountInINR);
    const symbol = getSymbol();
    return `${symbol}${converted}`;
  };

  const value = {
    currency,
    setCurrency,
    convertCurrency,
    getSymbol,
    getCurrencyInfo,
    formatPrice,
    rates,
    currencies,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
} 