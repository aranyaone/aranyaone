"use client";
import { useState, useEffect } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function PaymentGateway({ 
  amount, 
  currency, 
  onSuccess, 
  onError, 
  onCancel,
  paymentMethod = null 
}) {
  const { convertCurrency, getSymbol } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("select"); // select, processing, success, error
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod);

  const paymentGateways = {
    stripe: {
      name: "Stripe",
      logo: "💳",
      description: "Credit/Debit Cards, Apple Pay, Google Pay",
      supportedCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD", "SGD"],
      countries: ["US", "CA", "UK", "AU", "SG", "EU"],
    },
    razorpay: {
      name: "Razorpay",
      logo: "🔐",
      description: "UPI, Cards, Net Banking, Wallets",
      supportedCurrencies: ["INR"],
      countries: ["IN"],
    },
    paypal: {
      name: "PayPal",
      logo: "🔵",
      description: "PayPal Balance, Cards, Bank Transfer",
      supportedCurrencies: ["USD", "EUR", "GBP", "CAD", "AUD"],
      countries: ["US", "CA", "UK", "AU", "EU"],
    },
    upi: {
      name: "UPI",
      logo: "📱",
      description: "Google Pay, PhonePe, Paytm, BHIM",
      supportedCurrencies: ["INR"],
      countries: ["IN"],
    },
  };

  // Get available payment methods based on currency
  const getAvailableMethods = () => {
    return Object.entries(paymentGateways).filter(([key, gateway]) => 
      gateway.supportedCurrencies.includes(currency)
    );
  };

  const handlePayment = async (gatewayKey) => {
    setLoading(true);
    setStep("processing");

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would integrate with actual payment gateways
      switch (gatewayKey) {
        case "stripe":
          await processStripePayment();
          break;
        case "razorpay":
          await processRazorpayPayment();
          break;
        case "paypal":
          await processPayPalPayment();
          break;
        case "upi":
          await processUPIPayment();
          break;
        default:
          throw new Error("Unsupported payment method");
      }

      setStep("success");
      onSuccess && onSuccess({ amount, currency, method: gatewayKey });
    } catch (error) {
      console.error("Payment error:", error);
      setStep("error");
      onError && onError(error);
    } finally {
      setLoading(false);
    }
  };

  // Mock payment processing functions
  const processStripePayment = async () => {
    // Integration with Stripe
    console.log("Processing Stripe payment:", { amount, currency });
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    // const { error } = await stripe.redirectToCheckout({...});
  };

  const processRazorpayPayment = async () => {
    // Integration with Razorpay
    console.log("Processing Razorpay payment:", { amount, currency });
    // const options = { amount: amount * 100, currency, ... };
    // const razorpay = new Razorpay(options);
    // razorpay.open();
  };

  const processPayPalPayment = async () => {
    // Integration with PayPal
    console.log("Processing PayPal payment:", { amount, currency });
    // PayPal.Buttons({...}).render('#paypal-button-container');
  };

  const processUPIPayment = async () => {
    // UPI integration
    console.log("Processing UPI payment:", { amount, currency });
    // Generate UPI QR code or deep link
  };

  const renderPaymentMethods = () => {
    const availableMethods = getAvailableMethods();

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Choose Payment Method
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableMethods.map(([key, gateway]) => (
            <button
              key={key}
              onClick={() => handlePayment(key)}
              disabled={loading}
              className="group relative p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-left disabled:opacity-50"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{gateway.logo}</div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {gateway.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {gateway.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {gateway.supportedCurrencies.map((curr) => (
                      <span
                        key={curr}
                        className="inline-block px-2 py-1 bg-gray-50 text-xs text-gray-600 rounded-md"
                      >
                        {curr}
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
      </div>
    );
  };

  const renderProcessing = () => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h3>
      <p className="text-gray-600">Please wait while we process your payment...</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">✅</div>
      <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-4">
        Your payment of {getSymbol()}{amount} has been processed successfully.
      </p>
      <button
        onClick={() => onSuccess && onSuccess({ amount, currency })}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Continue
      </button>
    </div>
  );

  const renderError = () => (
    <div className="text-center py-8">
      <div className="text-6xl mb-4">❌</div>
      <h3 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h3>
      <p className="text-gray-600 mb-4">
        There was an error processing your payment. Please try again.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setStep("select")}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => onCancel && onCancel()}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {step === "select" && renderPaymentMethods()}
      {step === "processing" && renderProcessing()}
      {step === "success" && renderSuccess()}
      {step === "error" && renderError()}
    </div>
  );
} 