import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'

export default function CheckoutPage() {
  const router = useRouter()
  const { plan } = router.query
  const { user, login, updateSubscription } = useAuth()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    country: 'US'
  })

  const plans = {
    pro: {
      name: 'Pro',
      price: 29,
      period: 'month',
      description: 'Perfect for growing businesses'
    },
    enterprise: {
      name: 'Enterprise', 
      price: 99,
      period: 'month',
      description: 'For large organizations'
    }
  }

  const selectedPlan = plans[plan]

  useEffect(() => {
    if (!selectedPlan) {
      router.push('/pricing')
    }
  }, [selectedPlan, router])

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        name: user.name || ''
      }))
    }
  }, [user])

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const simulatePayment = async () => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const subscriptionData = {
      plan: plan,
      status: 'active',
      trialEndsAt: null,
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenewal: true,
      paymentMethod: paymentMethod,
      lastPayment: {
        amount: selectedPlan.price,
        date: new Date().toISOString(),
        status: 'succeeded'
      }
    }

    if (user) {
      updateSubscription(subscriptionData)
    } else {
      login({
        name: formData.name,
        email: formData.email,
        subscription: subscriptionData
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await simulatePayment()
      
      // Redirect to success page
      router.push('/profile/subscription?success=true')
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!selectedPlan) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Head>
        <title>Checkout - Aranya One</title>
        <meta name="description" content="Complete your subscription to Aranya One" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">💳 Complete Your Purchase</h1>
            <p className="text-gray-600">Secure checkout powered by industry-leading payment processors</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedPlan.name} Plan</h3>
                    <p className="text-sm text-gray-600">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">${selectedPlan.price}</div>
                    <div className="text-sm text-gray-500">per {selectedPlan.period}</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">${selectedPlan.price}/month</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>7-day free trial included</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">💳 Payment Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="stripe"
                        checked={paymentMethod === 'stripe'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Credit/Debit Card (Stripe)</div>
                        <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                      </div>
                      <div className="text-2xl">💳</div>
                    </label>

                    {formData.country === 'IN' && (
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="razorpay"
                          checked={paymentMethod === 'razorpay'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Razorpay (India)</div>
                          <div className="text-sm text-gray-500">UPI, Net Banking, Cards, Wallets</div>
                        </div>
                        <div className="text-2xl">🇮🇳</div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Mock Card Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="19"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Processing Payment...
                    </span>
                  ) : (
                    `Complete Purchase - $${selectedPlan.price}/month`
                  )}
                </button>

                <div className="text-center text-sm text-gray-500">
                  <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
                  <p className="mt-2">🔒 Your payment information is secure and encrypted.</p>
                </div>
              </form>
            </div>
          </div>

          {/* Back to Pricing */}
          <div className="mt-8 text-center">
            <a href="/pricing" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Pricing
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}