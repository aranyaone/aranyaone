# Payment Integration Guide for Bujji Chat

This guide provides step-by-step instructions for integrating real payment gateways into your Bujji Chat platform.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file in your project root:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret_key

# Database (Optional - for transaction tracking)
DATABASE_URL=your_database_url
```

### 2. Install Dependencies

```bash
npm install stripe @stripe/stripe-js razorpay @paypal/react-paypal-js
```

## 💳 Stripe Integration

### Frontend Setup

1. **Create Stripe Provider** (`app/components/StripeProvider.js`):

```jsx
"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripeProvider({ children }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}
```

2. **Create Payment Form** (`app/components/StripePaymentForm.js`):

```jsx
"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function StripePaymentForm({ amount, currency, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent on your backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        onError(error);
      } else {
        onSuccess(paymentIntent);
      }
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
            },
          }}
        />
      </div>
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-6 py-3 bg-primary text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay ${currency} ${amount}`}
      </button>
    </form>
  );
}
```

### Backend Setup

3. **Create API Route** (`app/api/create-payment-intent/route.js`):

```javascript
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, currency } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
```

## 🔐 Razorpay Integration

### Frontend Setup

1. **Create Razorpay Component** (`app/components/RazorpayPayment.js`):

```jsx
"use client";
import { useEffect } from "react";

export default function RazorpayPayment({ amount, currency, onSuccess, onError }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      // Create order on your backend
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });

      const { orderId } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: currency,
        name: "Bujji Chat",
        description: "Payment for Bujji Chat services",
        order_id: orderId,
        handler: function (response) {
          onSuccess(response);
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#7C3AED",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full px-6 py-3 bg-primary text-white rounded-lg"
    >
      Pay with Razorpay
    </button>
  );
}
```

### Backend Setup

2. **Create API Route** (`app/api/create-razorpay-order/route.js`):

```javascript
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount, currency } = await request.json();

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: currency,
      receipt: `order_${Date.now()}`,
    });

    return Response.json({ orderId: order.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
```

## 🔵 PayPal Integration

### Frontend Setup

1. **Create PayPal Component** (`app/components/PayPalPayment.js`):

```jsx
"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalPayment({ amount, currency, onSuccess, onError }) {
  return (
    <PayPalScriptProvider options={{ 
      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      currency: currency 
    }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  currency_code: currency,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
          });
        }}
        onError={(err) => {
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
}
```

## 🏦 UPI Integration

### Frontend Setup

1. **Create UPI Component** (`app/components/UPIPayment.js`):

```jsx
"use client";
import { useState } from "react";

export default function UPIPayment({ amount, onSuccess, onError }) {
  const [upiId, setUpiId] = useState("");

  const handleUPIPayment = () => {
    if (!upiId) {
      onError(new Error("Please enter UPI ID"));
      return;
    }

    // Generate UPI deep link
    const upiUrl = `upi://pay?pa=${upiId}&pn=Bujji Chat&am=${amount}&cu=INR`;
    
    // Open UPI app
    window.open(upiUrl, "_blank");
    
    // In real implementation, you'd verify payment on backend
    setTimeout(() => {
      onSuccess({ method: "UPI", amount });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          UPI ID
        </label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="yourname@upi"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      
      <button
        onClick={handleUPIPayment}
        className="w-full px-6 py-3 bg-primary text-white rounded-lg"
      >
        Pay with UPI
      </button>
    </div>
  );
}
```

## 🔄 Payment Gateway Integration

### Update PaymentGateway Component

Replace the mock functions in `app/components/PaymentGateway.js` with real integrations:

```jsx
// Replace the mock functions with real implementations
const processStripePayment = async () => {
  // Use StripePaymentForm component
  return <StripePaymentForm amount={amount} currency={currency} onSuccess={onSuccess} onError={onError} />;
};

const processRazorpayPayment = async () => {
  // Use RazorpayPayment component
  return <RazorpayPayment amount={amount} currency={currency} onSuccess={onSuccess} onError={onError} />;
};

const processPayPalPayment = async () => {
  // Use PayPalPayment component
  return <PayPalPayment amount={amount} currency={currency} onSuccess={onSuccess} onError={onError} />;
};
```

## 📊 Transaction Tracking

### Database Schema (Optional)

```sql
-- Create transactions table
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(3),
  payment_method VARCHAR(50),
  status VARCHAR(20),
  gateway_response JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create wallet_balances table
CREATE TABLE wallet_balances (
  user_id VARCHAR(255) PRIMARY KEY,
  balance_inr DECIMAL(10,2) DEFAULT 0,
  balance_usd DECIMAL(10,2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes for Transaction Management

1. **Create Transaction** (`app/api/transactions/route.js`):

```javascript
export async function POST(request) {
  try {
    const { userId, amount, currency, paymentMethod, status, gatewayResponse } = await request.json();
    
    // Save to database
    const transaction = await db.transactions.create({
      userId,
      amount,
      currency,
      paymentMethod,
      status,
      gatewayResponse,
    });

    // Update wallet balance
    if (status === "completed") {
      await updateWalletBalance(userId, amount, currency);
    }

    return Response.json({ success: true, transaction });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
```

## 🛡️ Security Best Practices

1. **Environment Variables**: Never commit API keys to version control
2. **Input Validation**: Validate all payment data on both frontend and backend
3. **Webhook Verification**: Verify webhooks from payment gateways
4. **HTTPS Only**: Always use HTTPS in production
5. **Error Handling**: Implement proper error handling and logging

## 🚀 Deployment Checklist

- [ ] Set up environment variables on your hosting platform
- [ ] Configure webhook endpoints for payment gateways
- [ ] Test payment flows in sandbox/test mode
- [ ] Set up monitoring and logging
- [ ] Implement proper error handling
- [ ] Add transaction tracking
- [ ] Test with real payment methods

## 📞 Support

For payment gateway specific issues:
- **Stripe**: https://support.stripe.com/
- **Razorpay**: https://razorpay.com/support/
- **PayPal**: https://www.paypal.com/support/

## 🔗 Useful Links

- [Stripe Documentation](https://stripe.com/docs)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [PayPal Developer Documentation](https://developer.paypal.com/)
- [UPI Deep Linking Guide](https://www.npci.org.in/upi-deep-linking)

---

**Note**: This guide provides the foundation for payment integration. Always refer to the official documentation of each payment gateway for the most up-to-date implementation details and security best practices. 