'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  QrCode, 
  Smartphone, 
  CreditCard, 
  Wallet, 
  Globe, 
  Download, 
  Share2, 
  Copy, 
  CheckCircle,
  Loader2,
  Camera,
  Scan,
  X,
  RefreshCw,
  CreditCard as BankIcon
} from 'lucide-react';

const QRPaymentSystem = () => {
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');

  // World countries with their currencies and payment methods
  const countries = {
    IN: {
      name: 'India',
      currency: 'INR',
      banks: ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank', 'Yes Bank'],
      wallets: ['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay', 'BHIM UPI'],
      upi: true,
      qrFormat: 'UPI'
    },
    US: {
      name: 'United States',
      currency: 'USD',
      banks: ['Chase', 'Bank of America', 'Wells Fargo', 'Citibank', 'US Bank'],
      wallets: ['PayPal', 'Venmo', 'Cash App', 'Apple Pay', 'Google Pay'],
      upi: false,
      qrFormat: 'EMV'
    },
    UK: {
      name: 'United Kingdom',
      currency: 'GBP',
      banks: ['Barclays', 'HSBC', 'Lloyds', 'NatWest', 'Santander'],
      wallets: ['PayPal', 'Revolut', 'Monzo', 'Starling', 'Apple Pay'],
      upi: false,
      qrFormat: 'EMV'
    },
    CN: {
      name: 'China',
      currency: 'CNY',
      banks: ['ICBC', 'CCB', 'ABC', 'BOC', 'Bank of Communications'],
      wallets: ['WeChat Pay', 'Alipay', 'UnionPay'],
      upi: false,
      qrFormat: 'UnionPay'
    },
    JP: {
      name: 'Japan',
      currency: 'JPY',
      banks: ['MUFG', 'SMBC', 'Mizuho', 'Resona', 'SBI'],
      wallets: ['PayPay', 'LINE Pay', 'Rakuten Pay', 'd Barai'],
      upi: false,
      qrFormat: 'JPQR'
    },
    SG: {
      name: 'Singapore',
      currency: 'SGD',
      banks: ['DBS', 'OCBC', 'UOB', 'Standard Chartered', 'Maybank'],
      wallets: ['PayNow', 'GrabPay', 'FavePay', 'Liquid Pay'],
      upi: false,
      qrFormat: 'PayNow'
    },
    AU: {
      name: 'Australia',
      currency: 'AUD',
      banks: ['Commonwealth', 'ANZ', 'Westpac', 'NAB', 'Bendigo'],
      wallets: ['PayID', 'Beem It', 'Osko', 'Apple Pay', 'Google Pay'],
      upi: false,
      qrFormat: 'PayID'
    },
    CA: {
      name: 'Canada',
      currency: 'CAD',
      banks: ['RBC', 'TD Bank', 'Scotiabank', 'BMO', 'CIBC'],
      wallets: ['Interac e-Transfer', 'PayPal', 'Apple Pay', 'Google Pay'],
      upi: false,
      qrFormat: 'Interac'
    },
    DE: {
      name: 'Germany',
      currency: 'EUR',
      banks: ['Deutsche Bank', 'Commerzbank', 'Sparkasse', 'Volksbank', 'HypoVereinsbank'],
      wallets: ['PayPal', 'Klarna', 'Sofort', 'Apple Pay', 'Google Pay'],
      upi: false,
      qrFormat: 'SEPA'
    },
    BR: {
      name: 'Brazil',
      currency: 'BRL',
      banks: ['Itaú', 'Bradesco', 'Santander', 'Banco do Brasil', 'Caixa'],
      wallets: ['Pix', 'PayPal', 'PagSeguro', 'Mercado Pago'],
      upi: false,
      qrFormat: 'Pix'
    }
  };

  const [selectedCountryData, setSelectedCountryData] = useState(countries.IN);

  useEffect(() => {
    setSelectedCountryData(countries[selectedCountry]);
    setSelectedCurrency(countries[selectedCountry].currency);
    setSelectedBank('');
    setSelectedWallet('');
  }, [selectedCountry]);

  const generateQR = async () => {
    if (!amount || amount <= 0) return;
    
    setIsGenerating(true);
    
    // Simulate QR generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const qrData = {
      country: selectedCountry,
      currency: selectedCurrency,
      amount: parseFloat(amount),
      bank: selectedBank,
      wallet: selectedWallet,
      timestamp: new Date().toISOString(),
      format: selectedCountryData.qrFormat
    };
    
    setQrCode(JSON.stringify(qrData));
    setShowQR(true);
    setIsGenerating(false);
  };

  const copyQRData = () => {
    navigator.clipboard.writeText(qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    // Download QR functionality removed: canvasRef is no longer used
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QR Payment',
          text: `Payment QR Code - ${selectedCurrency} ${amount}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      copyQRData();
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setActiveTab('scan');
    // Simulate camera access (functionality removed: videoRef is no longer used)
  };

  const stopScanning = () => {
    setIsScanning(false);
    setScanResult('');
  };

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            World-Class QR Payment System
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Accept payments from anywhere in the world with support for all currencies, banks, and digital wallets
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('generate')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'generate'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <QrCode className="w-5 h-5 inline mr-2" />
                Generate QR
              </button>
              <button
                onClick={() => setActiveTab('scan')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'scan'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Scan className="w-5 h-5 inline mr-2" />
                Scan QR
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'generate' && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Configuration Panel */}
              <div className="space-y-6">
                <motion.div 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Globe className="w-6 h-6 mr-3 text-blue-400" />
                    Payment Configuration
                  </h3>

                  {/* Country Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Select Country
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {Object.entries(countries).map(([code, country]) => (
                        <button
                          key={code}
                          onClick={() => setSelectedCountry(code)}
                          className={`p-3 rounded-xl border transition-all duration-300 ${
                            selectedCountry === code
                              ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                              : 'border-slate-600 bg-slate-700/50 text-gray-300 hover:border-slate-500 hover:bg-slate-600/50'
                          }`}
                        >
                          <div className="text-xs font-semibold">{country.name}</div>
                          <div className="text-xs text-gray-400">{country.currency}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Amount ({selectedCurrency})
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {selectedCurrency}
                      </div>
                    </div>
                  </div>

                  {/* Bank Selection */}
                  {selectedCountryData.banks.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Select Bank (Optional)
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">Choose a bank</option>
                        {selectedCountryData.banks.map((bank) => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Wallet Selection */}
                  {selectedCountryData.wallets.length > 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Select Digital Wallet (Optional)
                      </label>
                      <select
                        value={selectedWallet}
                        onChange={(e) => setSelectedWallet(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">Choose a wallet</option>
                        {selectedCountryData.wallets.map((wallet) => (
                          <option key={wallet} value={wallet}>{wallet}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Generate Button */}
                  <button
                    onClick={generateQR}
                    disabled={!amount || isGenerating}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating QR...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-5 h-5 mr-2" />
                        Generate Payment QR
                      </>
                    )}
                  </button>
                </motion.div>

                {/* Payment Methods Info */}
                <motion.div 
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-green-400" />
                    Supported Payment Methods
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <BankIcon className="w-4 h-4 mr-2 text-blue-400" />
                      <span>Bank Transfers: {selectedCountryData.banks.length} banks</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Wallet className="w-4 h-4 mr-2 text-green-400" />
                      <span>Digital Wallets: {selectedCountryData.wallets.length} wallets</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Globe className="w-4 h-4 mr-2 text-purple-400" />
                      <span>Format: {selectedCountryData.qrFormat}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* QR Display Panel */}
              <div className="space-y-6">
                {showQR ? (
                  <motion.div 
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <QrCode className="w-6 h-6 mr-3 text-blue-400" />
                      Payment QR Code
                    </h3>
                    
                    <div className="bg-white rounded-2xl p-8 flex justify-center mb-6">
                      {/* QR Code would be rendered here (canvas removed) */}
                      <div className="w-48 h-48 flex items-center justify-center text-gray-500 border-2 border-gray-200 rounded-xl bg-white">
                        QR Code Generated
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-700/50 rounded-xl p-4">
                        <div className="text-sm text-gray-400 mb-2">Payment Details</div>
                        <div className="text-white font-semibold">
                          {selectedCurrency} {amount}
                        </div>
                        <div className="text-sm text-gray-300">
                          {selectedCountryData.name} • {selectedCountryData.qrFormat}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={copyQRData}
                          className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center"
                        >
                          {copied ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={downloadQR}
                          className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                        <button
                          onClick={shareQR}
                          className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 h-full flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center text-gray-400">
                      <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold">Generate a QR Code</p>
                      <p className="text-sm">Configure payment details and generate your QR code</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <motion.div 
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Camera className="w-6 h-6 mr-3 text-blue-400" />
                  Scan QR Code
                </h3>

                {!isScanning ? (
                  <div className="text-center space-y-6">
                    <div className="bg-slate-700/50 rounded-2xl p-8">
                      <Scan className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                      <p className="text-lg font-semibold text-white mb-2">Ready to Scan</p>
                      <p className="text-gray-400">Point your camera at a QR code to scan payment information</p>
                    </div>
                    
                    <button
                      onClick={startScanning}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Start Scanning
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative bg-black rounded-2xl overflow-hidden">
                    {/* Video element removed: videoRef is no longer used */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border-2 border-blue-400 rounded-lg w-48 h-48 relative">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-400"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-400"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-400"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={stopScanning}
                        className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Stop Scanning
                      </button>
                      <button
                        onClick={() => setScanResult('Sample QR Data: {"amount": 100, "currency": "USD", "country": "US"}')}
                        className="flex-1 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Test Scan
                      </button>
                    </div>
                  </div>
                )}

                {scanResult && (
                  <motion.div 
                    className="mt-6 bg-green-900/20 border border-green-500/30 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                      <span className="font-semibold text-green-400">QR Code Scanned Successfully!</span>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <pre className="text-sm text-gray-300 overflow-x-auto">{scanResult}</pre>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Grid */}
        <motion.div 
          className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h4 className="text-lg font-semibold text-white mb-2">Global Support</h4>
            <p className="text-gray-400 text-sm">Support for 10+ countries with local payment methods</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-green-400" />
            <h4 className="text-lg font-semibold text-white mb-2">Multi-Currency</h4>
            <p className="text-gray-400 text-sm">Accept payments in local currencies worldwide</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
            <Wallet className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h4 className="text-lg font-semibold text-white mb-2">Digital Wallets</h4>
            <p className="text-gray-400 text-sm">Integration with popular digital wallets</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center">
            <Smartphone className="w-12 h-12 mx-auto mb-4 text-pink-400" />
            <h4 className="text-lg font-semibold text-white mb-2">Mobile Optimized</h4>
            <p className="text-gray-400 text-sm">Perfect experience on all mobile devices</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QRPaymentSystem; 