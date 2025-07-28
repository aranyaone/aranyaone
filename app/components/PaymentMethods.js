"use client";
import { useCurrency } from "../context/CurrencyContext";

const paymentMethods = {
  INR: [
    { 
      name: "UPI", 
      logo: "💳", 
      description: "Instant UPI payments",
      popular: true,
      methods: ["Google Pay", "PhonePe", "Paytm", "BHIM"]
    },
    { 
      name: "Razorpay", 
      logo: "🔐", 
      description: "Cards, Net Banking, Wallets",
      popular: true,
      methods: ["Credit/Debit Cards", "Net Banking", "Wallets"]
    },
    { 
      name: "Paytm", 
      logo: "📱", 
      description: "Paytm Wallet & UPI",
      methods: ["Paytm Wallet", "UPI", "Cards"]
    },
    { 
      name: "PhonePe", 
      logo: "📲", 
      description: "PhonePe UPI & Wallet",
      methods: ["UPI", "PhonePe Wallet", "Cards"]
    },
    { 
      name: "Net Banking", 
      logo: "🏦", 
      description: "All major banks",
      methods: ["HDFC", "SBI", "ICICI", "Axis", "Kotak"]
    }
  ],
  USD: [
    { 
      name: "Stripe", 
      logo: "💳", 
      description: "Cards, Apple Pay, Google Pay",
      popular: true,
      methods: ["Visa", "Mastercard", "Apple Pay", "Google Pay"]
    },
    { 
      name: "PayPal", 
      logo: "🔵", 
      description: "PayPal account or cards",
      popular: true,
      methods: ["PayPal Balance", "Cards", "Bank Transfer"]
    },
    { 
      name: "Apple Pay", 
      logo: "🍎", 
      description: "Apple Pay & Apple Card",
      methods: ["Apple Pay", "Apple Card"]
    },
    { 
      name: "Google Pay", 
      logo: "🤖", 
      description: "Google Pay & Android Pay",
      methods: ["Google Pay", "Android Pay"]
    },
    { 
      name: "Bank Transfer", 
      logo: "🏦", 
      description: "Direct bank transfer",
      methods: ["ACH", "Wire Transfer", "SEPA"]
    }
  ],
  EUR: [
    { 
      name: "Stripe", 
      logo: "💳", 
      description: "European cards & SEPA",
      popular: true,
      methods: ["Visa", "Mastercard", "SEPA Direct Debit"]
    },
    { 
      name: "PayPal", 
      logo: "🔵", 
      description: "PayPal Europe",
      popular: true,
      methods: ["PayPal", "Cards", "SEPA"]
    },
    { 
      name: "iDEAL", 
      logo: "🇳🇱", 
      description: "Dutch bank transfers",
      methods: ["iDEAL", "Dutch Banks"]
    },
    { 
      name: "SOFORT", 
      logo: "🇩🇪", 
      description: "German bank transfers",
      methods: ["SOFORT", "German Banks"]
    }
  ],
  GBP: [
    { 
      name: "Stripe", 
      logo: "💳", 
      description: "UK cards & Faster Payments",
      popular: true,
      methods: ["Visa", "Mastercard", "Faster Payments"]
    },
    { 
      name: "PayPal", 
      logo: "🔵", 
      description: "PayPal UK",
      popular: true,
      methods: ["PayPal", "Cards", "Bank Transfer"]
    }
  ]
};

export default function PaymentMethods({ currency = "INR", onSelect }) {
  const { currency: selectedCurrency } = useCurrency();
  const currentCurrency = currency || selectedCurrency;
  const methods = paymentMethods[currentCurrency] || paymentMethods.USD;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Choose Payment Method
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map((method, index) => (
          <button
            key={index}
            onClick={() => onSelect && onSelect(method)}
            className="group relative p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-left"
          >
            {method.popular && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                Popular
              </div>
            )}
            
            <div className="flex items-start gap-4">
              <div className="text-2xl">{method.logo}</div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                  {method.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {method.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {method.methods.map((m, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 bg-gray-50 text-xs text-gray-600 rounded-md"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              
              <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-blue-500 text-lg">🔒</div>
          <div>
            <h4 className="font-medium text-blue-900">Secure Payment</h4>
            <p className="text-sm text-blue-700 mt-1">
              All payments are encrypted and secure. We use industry-standard SSL encryption to protect your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 