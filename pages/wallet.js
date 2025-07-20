import Head from 'next/head'
import { useState } from 'react'
import { withAuth, useAuth } from '../hooks/useAuth'
import { useNotifications } from '../components/SmartNotification'
import { LineChart, BarChart, ChartContainer, sampleData } from '../components/Charts'

function WalletPage() {
  const { user } = useAuth()
  const { success, warning } = useNotifications()
  const [selectedCurrency, setSelectedCurrency] = useState('INR')

  const walletData = {
    balance: {
      INR: 125470,
      USD: 1520,
      EUR: 1380,
      BTC: 0.045
    },
    transactions: [
      { id: 1, type: 'credit', amount: 5000, currency: 'INR', description: 'Service Revenue', date: '2024-01-15', status: 'completed' },
      { id: 2, type: 'debit', amount: 1200, currency: 'INR', description: 'Server Costs', date: '2024-01-14', status: 'completed' },
      { id: 3, type: 'credit', amount: 8500, currency: 'INR', description: 'Client Payment', date: '2024-01-13', status: 'pending' },
      { id: 4, type: 'debit', amount: 750, currency: 'INR', description: 'Marketing Budget', date: '2024-01-12', status: 'completed' },
      { id: 5, type: 'credit', amount: 12000, currency: 'INR', description: 'Subscription Revenue', date: '2024-01-11', status: 'completed' }
    ],
    cards: [
      { id: 1, type: 'Business', last4: '4532', brand: 'Visa', expires: '12/26', isPrimary: true },
      { id: 2, type: 'Personal', last4: '8901', brand: 'Mastercard', expires: '08/25', isPrimary: false }
    ]
  }

  const handleTransfer = () => {
    success('Transfer initiated successfully!', {
      title: 'Transfer Successful',
      duration: 3000
    })
  }

  const handleWithdraw = () => {
    warning('Withdrawal request submitted for review', {
      title: 'Withdrawal Pending',
      duration: 4000
    })
  }

  const currencies = ['INR', 'USD', 'EUR', 'BTC']

  return (
    <div>
      <Head>
        <title>Wallet - Aranya One</title>
        <meta name="description" content="Manage your empire wallet and transactions" />
      </Head>
      
      <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">💰 Empire Wallet</h1>
            <p className="text-gray-600">Welcome {user?.name}! Manage your finances and transactions securely.</p>
          </div>

          {/* Balance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            {/* Main Balance Card */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
                    <div className="text-4xl font-bold">
                      {selectedCurrency === 'BTC' ? '₿' : '₹'}{walletData.balance[selectedCurrency].toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
                    >
                      {currencies.map(curr => (
                        <option key={curr} value={curr} className="text-gray-800">{curr}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">+23%</div>
                    <div className="text-sm opacity-80">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">₹45K</div>
                    <div className="text-sm opacity-80">This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm opacity-80">Transactions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <button
                onClick={handleTransfer}
                className="w-full bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-colors font-semibold"
              >
                💸 Transfer Money
              </button>
              <button
                onClick={handleWithdraw}
                className="w-full bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-colors font-semibold"
              >
                🏦 Withdraw
              </button>
              <button className="w-full bg-purple-500 text-white p-4 rounded-xl hover:bg-purple-600 transition-colors font-semibold">
                📊 Request Report
              </button>
            </div>
          </div>

          {/* Multi-Currency Balances */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {currencies.map(currency => (
              <CurrencyCard 
                key={currency}
                currency={currency}
                balance={walletData.balance[currency]}
                isSelected={selectedCurrency === currency}
                onClick={() => setSelectedCurrency(currency)}
              />
            ))}
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ChartContainer title="💰 Revenue Trend">
              <LineChart 
                data={sampleData.revenue} 
                width={400} 
                height={200} 
                color="#10B981" 
              />
            </ChartContainer>
            
            <ChartContainer title="📊 Expense Categories">
              <BarChart 
                data={[
                  { label: 'Server', value: 15000 },
                  { label: 'Marketing', value: 8500 },
                  { label: 'Staff', value: 25000 },
                  { label: 'Software', value: 6000 }
                ]} 
                width={400} 
                height={200} 
                color="#8B5CF6" 
              />
            </ChartContainer>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">📋 Recent Transactions</h2>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {walletData.transactions.map(transaction => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">💳 Payment Methods</h2>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Add Card
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {walletData.cards.map(card => (
                <PaymentCard key={card.id} card={card} />
              ))}
            </div>
          </div>

          {/* Security & Settings */}
          <SecuritySettings />

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Dashboard</a>
          </div>
        </div>
      </main>
    </div>
  )
}

function CurrencyCard({ currency, balance, isSelected, onClick }) {
  const symbols = { INR: '₹', USD: '$', EUR: '€', BTC: '₿' }
  
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl p-6 shadow-lg border-2 cursor-pointer transition-colors ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {symbols[currency]}{balance.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">{currency}</div>
      </div>
    </div>
  )
}

function TransactionItem({ transaction }) {
  const isCredit = transaction.type === 'credit'
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isCredit ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {isCredit ? '↗️' : '↙️'}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{transaction.description}</h4>
          <p className="text-sm text-gray-600">{transaction.date}</p>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-bold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
          {isCredit ? '+' : '-'}₹{transaction.amount.toLocaleString()}
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${
          transaction.status === 'completed' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {transaction.status}
        </div>
      </div>
    </div>
  )
}

function PaymentCard({ card }) {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-xl relative">
      {card.isPrimary && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          Primary
        </div>
      )}
      <div className="mb-4">
        <div className="text-sm opacity-80">{card.type} Card</div>
        <div className="text-lg font-bold">•••• •••• •••• {card.last4}</div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xs opacity-80">Expires</div>
          <div className="font-semibold">{card.expires}</div>
        </div>
        <div className="text-xl font-bold">{card.brand}</div>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🔒 Security & Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <SecuritySetting 
            title="Two-Factor Authentication"
            description="Secure your account with 2FA"
            enabled={true}
          />
          <SecuritySetting 
            title="Transaction Alerts"
            description="Get notified of all transactions"
            enabled={true}
          />
          <SecuritySetting 
            title="Withdrawal Limits"
            description="Daily limit: ₹50,000"
            enabled={true}
          />
        </div>
        
        <div className="space-y-4">
          <SecuritySetting 
            title="Auto-Lock Wallet"
            description="Lock after 15 minutes of inactivity"
            enabled={false}
          />
          <SecuritySetting 
            title="Biometric Access"
            description="Use fingerprint/face ID"
            enabled={true}
          />
          <SecuritySetting 
            title="Backup & Recovery"
            description="Secure wallet backup enabled"
            enabled={true}
          />
        </div>
      </div>
    </div>
  )
}

function SecuritySetting({ title, description, enabled }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className={`w-12 h-6 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-300'} relative`}>
        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        }`}></div>
      </div>
    </div>
  )
}

// Protect the wallet page - requires admin role
export default withAuth(WalletPage, 'admin')