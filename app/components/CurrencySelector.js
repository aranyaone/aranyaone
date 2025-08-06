"use client";
import { useState, useRef, useEffect } from "react";
import { useCurrency, currencies } from "../context/CurrencyContext";

export default function CurrencySelector() {
  const { currency, setCurrency, getCurrencyInfo } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentCurrency = getCurrencyInfo();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-medium"
      >
        <span className="text-lg">{currentCurrency?.flag}</span>
        <span>{currentCurrency?.code}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 min-w-[200px] z-50">
          <div className="p-2">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  setCurrency(curr.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary/10 ${
                  currency === curr.code ? 'bg-primary/20 text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                <span className="text-lg">{curr.flag}</span>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{curr.code}</span>
                  <span className="text-xs text-gray-500">{curr.name}</span>
                </div>
                {currency === curr.code && (
                  <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 