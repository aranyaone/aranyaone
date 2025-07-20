import Head from 'next/head'
import { useState } from 'react'
import { useAuth } from '../lib/auth'

export default function PricingPage() {
  const { user, login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      period: '7 days',
      description: 'Perfect for getting started with your digital empire',
      features: [
        '3 Services',
        'Basic Analytics', 
        'Community Support',
        'Standard Templates',
        '1GB Storage'
      ],
      limitations: [
        'Limited to 3 services',
        'Basic features only',
        'Community support'
      ],
      buttonText: 'Start Free Trial',
      popular: false,
      color: 'gray'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      description: 'For growing businesses and serious entrepreneurs',
      features: [
        'Unlimited Services',
        'Advanced Analytics',
        'Priority Support',
        'Premium Templates',
        '50GB Storage',
        'Custom Domain',
        'API Access',
        'Team Collaboration'
      ],
      limitations: [],
      buttonText: 'Upgrade to Pro',
      popular: true,
      color: 'blue'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      description: 'For large organizations with advanced needs',
      features: [
        'Everything in Pro',
        'White-label Solutions',
        'Dedicated Support',
        'Custom Integrations',
        '500GB Storage',
        'SLA Guarantee',
        'Advanced Security',
        'Custom Training'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      popular: false,
      color: 'purple'
    }
  ]

  const handleSelectPlan = async (plan) => {
    setLoading(true)
    setSelectedPlan(plan.id)

    try {
      if (plan.id === 'free') {
        // Start free trial
        if (!user) {
          login({
            subscription: {
              plan: 'free',
              status: 'trial',
              trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              createdAt: new Date().toISOString(),
              autoRenewal: false
            }
          })
        }
        window.location.href = '/dashboard'
      } else if (plan.id === 'enterprise') {
        // Contact sales
        window.location.href = '/support?subject=enterprise-inquiry'
      } else {
        // Redirect to checkout
        window.location.href = `/checkout?plan=${plan.id}`
      }
    } catch (error) {
      console.error('Plan selection failed:', error)
    } finally {
      setLoading(false)
      setSelectedPlan(null)
    }
  }

  return (
    <div>
      <Head>
        <title>Pricing - Aranya One</title>
        <meta name="description" content="Choose the perfect plan for your digital empire. Start with a 7-day free trial." />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">💎 Choose Your Plan</h1>
            <p className="text-xl text-gray-600 mb-6">Start building your digital empire with a 7-day free trial</p>
            <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
              <span>✅</span>
              <span>No credit card required for trial</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <PricingCard 
                key={plan.id}
                plan={plan}
                onSelect={handleSelectPlan}
                loading={loading && selectedPlan === plan.id}
                isCurrentPlan={user?.subscription?.plan === plan.id}
              />
            ))}
          </div>

          {/* Feature Comparison */}
          <FeatureComparison plans={plans} />

          {/* FAQ Section */}
          <FAQSection />

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

function PricingCard({ plan, onSelect, loading, isCurrentPlan }) {
  const colorClasses = {
    gray: {
      border: 'border-gray-200',
      bg: 'bg-white',
      button: 'bg-gray-500 hover:bg-gray-600',
      badge: 'bg-gray-100 text-gray-800'
    },
    blue: {
      border: 'border-blue-300',
      bg: 'bg-blue-50',
      button: 'bg-blue-500 hover:bg-blue-600',
      badge: 'bg-blue-100 text-blue-800'
    },
    purple: {
      border: 'border-purple-300',
      bg: 'bg-purple-50',
      button: 'bg-purple-500 hover:bg-purple-600',
      badge: 'bg-purple-100 text-purple-800'
    }
  }

  const colors = colorClasses[plan.color]

  return (
    <div className={`relative rounded-2xl shadow-xl p-8 ${colors.bg} ${colors.border} border-2 transform hover:scale-105 transition-all duration-200 ${plan.popular ? 'ring-4 ring-blue-300' : ''}`}>
      
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
            🌟 Most Popular
          </span>
        </div>
      )}

      {isCurrentPlan && (
        <div className="absolute -top-4 right-4">
          <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            ✅ Current Plan
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-4">{plan.description}</p>
        
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-800">${plan.price}</span>
          <span className="text-gray-600">/{plan.period}</span>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">✨ What's included:</h4>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-green-500">✅</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => onSelect(plan)}
        disabled={loading || isCurrentPlan}
        className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors ${colors.button} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span>
            Processing...
          </span>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : (
          plan.buttonText
        )}
      </button>
    </div>
  )
}

function FeatureComparison({ plans }) {
  const allFeatures = [
    'Services Limit',
    'Analytics',
    'Support Type',
    'Templates',
    'Storage',
    'Custom Domain',
    'API Access',
    'Team Collaboration',
    'White-label',
    'SLA Guarantee'
  ]

  const getFeatureValue = (plan, feature) => {
    const featureMap = {
      'Services Limit': plan.id === 'free' ? '3' : 'Unlimited',
      'Analytics': plan.id === 'free' ? 'Basic' : 'Advanced',
      'Support Type': plan.id === 'free' ? 'Community' : plan.id === 'pro' ? 'Priority' : 'Dedicated',
      'Templates': plan.id === 'free' ? 'Standard' : 'Premium',
      'Storage': plan.id === 'free' ? '1GB' : plan.id === 'pro' ? '50GB' : '500GB',
      'Custom Domain': plan.id === 'free' ? '❌' : '✅',
      'API Access': plan.id === 'free' ? '❌' : '✅',
      'Team Collaboration': plan.id === 'free' ? '❌' : '✅',
      'White-label': plan.id === 'enterprise' ? '✅' : '❌',
      'SLA Guarantee': plan.id === 'enterprise' ? '✅' : '❌'
    }
    return featureMap[feature] || '❌'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">📊 Feature Comparison</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-6">Features</th>
              {plans.map((plan) => (
                <th key={plan.id} className="text-center py-4 px-6">
                  <div className="font-bold text-lg">{plan.name}</div>
                  <div className="text-sm text-gray-600">${plan.price}/{plan.period}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature) => (
              <tr key={feature} className="border-b border-gray-100">
                <td className="py-4 px-6 font-medium text-gray-800">{feature}</td>
                {plans.map((plan) => (
                  <td key={plan.id} className="py-4 px-6 text-center">
                    {getFeatureValue(plan, feature)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: 'How does the 7-day free trial work?',
      answer: 'Start using all Pro features immediately. No credit card required. After 7 days, choose to upgrade or continue with the free plan.'
    },
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards via Stripe (global) and Razorpay (India). Enterprise plans also support bank transfers.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees ever. You only pay the monthly subscription price.'
    },
    {
      question: 'What happens if I cancel?',
      answer: 'You can cancel anytime. Your account remains active until the end of your billing period, then switches to the free plan.'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">❓ Frequently Asked Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}