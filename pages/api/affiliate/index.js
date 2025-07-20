// Affiliate referral system API - Phase VI Optional
// This is a stub implementation ready for production use

// Mock affiliate data - replace with real database in production
let affiliateData = [
  {
    id: 1,
    userId: 2,
    userName: 'Jane Smith',
    referralCode: 'JANE2024',
    totalReferrals: 15,
    totalEarnings: 450.00,
    pendingEarnings: 120.00,
    status: 'active',
    joinedAt: '2024-01-01T00:00:00.000Z',
    lastPayout: '2024-01-15T00:00:00.000Z'
  }
];

let referralTransactions = [
  {
    id: 1,
    affiliateId: 1,
    referredUserId: 5,
    referredUserEmail: 'newuser@example.com',
    commission: 30.00,
    status: 'confirmed',
    createdAt: '2024-01-16T10:00:00.000Z',
    paidAt: null
  }
];

let nextAffiliateId = 2;
let nextTransactionId = 2;

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { action } = req.query;

    switch (req.method) {
      case 'GET':
        return handleGetAffiliate(req, res, action);
      case 'POST':
        return handleCreateAffiliate(req, res, action);
      case 'PUT':
        return handleUpdateAffiliate(req, res, action);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Affiliate API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function handleGetAffiliate(req, res, action) {
  const { userId, referralCode, limit = 50, offset = 0 } = req.query;

  switch (action) {
    case 'dashboard':
      return getAffiliateDashboard(req, res, userId);
    
    case 'referrals':
      return getAffiliateReferrals(req, res, userId);
    
    case 'validate':
      return validateReferralCode(req, res, referralCode);
    
    case 'leaderboard':
      return getAffiliateLeaderboard(req, res);
    
    default:
      return getAllAffiliates(req, res, { limit, offset });
  }
}

function getAffiliateDashboard(req, res, userId) {
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const affiliate = affiliateData.find(a => a.userId === parseInt(userId));
  
  if (!affiliate) {
    return res.status(404).json({ error: 'Affiliate not found' });
  }

  // Calculate recent performance
  const recentReferrals = referralTransactions.filter(
    t => t.affiliateId === affiliate.id &&
    new Date(t.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );

  const dashboard = {
    affiliate,
    stats: {
      totalReferrals: affiliate.totalReferrals,
      totalEarnings: affiliate.totalEarnings,
      pendingEarnings: affiliate.pendingEarnings,
      recentReferrals: recentReferrals.length,
      conversionRate: affiliate.totalReferrals > 0 ? 0.15 : 0, // Mock 15% conversion rate
      monthlyEarnings: recentReferrals.reduce((sum, t) => sum + t.commission, 0)
    },
    recentActivity: recentReferrals.slice(0, 5)
  };

  return res.status(200).json(dashboard);
}

function getAffiliateReferrals(req, res, userId) {
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const affiliate = affiliateData.find(a => a.userId === parseInt(userId));
  
  if (!affiliate) {
    return res.status(404).json({ error: 'Affiliate not found' });
  }

  const referrals = referralTransactions.filter(t => t.affiliateId === affiliate.id);

  return res.status(200).json({
    referrals,
    total: referrals.length,
    totalCommission: referrals.reduce((sum, t) => sum + t.commission, 0)
  });
}

function validateReferralCode(req, res, referralCode) {
  if (!referralCode) {
    return res.status(400).json({ error: 'Referral code is required' });
  }

  const affiliate = affiliateData.find(a => a.referralCode === referralCode);
  
  if (!affiliate) {
    return res.status(404).json({ 
      valid: false, 
      error: 'Invalid referral code' 
    });
  }

  if (affiliate.status !== 'active') {
    return res.status(400).json({ 
      valid: false, 
      error: 'Referral code is not active' 
    });
  }

  return res.status(200).json({
    valid: true,
    affiliate: {
      id: affiliate.id,
      userName: affiliate.userName,
      referralCode: affiliate.referralCode
    },
    discount: {
      type: 'percentage',
      value: 10, // 10% discount for new users
      description: 'Get 10% off your first month!'
    }
  });
}

function getAffiliateLeaderboard(req, res) {
  const { period = 'all' } = req.query;
  
  let filteredData = [...affiliateData];
  
  if (period === 'month') {
    // Mock monthly filtering - in production, filter by actual date ranges
    filteredData = affiliateData.filter(a => a.totalEarnings > 100);
  }

  const leaderboard = filteredData
    .sort((a, b) => b.totalEarnings - a.totalEarnings)
    .slice(0, 10)
    .map((affiliate, index) => ({
      rank: index + 1,
      userName: affiliate.userName,
      totalEarnings: affiliate.totalEarnings,
      totalReferrals: affiliate.totalReferrals,
      badge: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐'
    }));

  return res.status(200).json({
    leaderboard,
    period,
    lastUpdated: new Date().toISOString()
  });
}

function getAllAffiliates(req, res, { limit, offset }) {
  const start = parseInt(offset);
  const end = start + parseInt(limit);
  const paginatedAffiliates = affiliateData.slice(start, end);

  return res.status(200).json({
    affiliates: paginatedAffiliates,
    total: affiliateData.length,
    hasMore: end < affiliateData.length
  });
}

function handleCreateAffiliate(req, res, action) {
  const { userId, userName, customCode } = req.body;

  switch (action) {
    case 'register':
      return registerAffiliate(req, res, { userId, userName, customCode });
    
    case 'referral':
      return trackReferral(req, res);
    
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
}

function registerAffiliate(req, res, { userId, userName, customCode }) {
  if (!userId || !userName) {
    return res.status(400).json({ error: 'User ID and name are required' });
  }

  // Check if user is already an affiliate
  const existingAffiliate = affiliateData.find(a => a.userId === parseInt(userId));
  if (existingAffiliate) {
    return res.status(400).json({ error: 'User is already an affiliate' });
  }

  // Generate referral code
  let referralCode = customCode || `${userName.toUpperCase().replace(/\s+/g, '')}${new Date().getFullYear()}`;
  
  // Ensure code is unique
  while (affiliateData.find(a => a.referralCode === referralCode)) {
    referralCode += Math.floor(Math.random() * 100);
  }

  const newAffiliate = {
    id: nextAffiliateId++,
    userId: parseInt(userId),
    userName,
    referralCode,
    totalReferrals: 0,
    totalEarnings: 0.00,
    pendingEarnings: 0.00,
    status: 'active',
    joinedAt: new Date().toISOString(),
    lastPayout: null
  };

  affiliateData.push(newAffiliate);

  // In production:
  // 1. Save to database
  // 2. Send welcome email with referral code
  // 3. Create affiliate dashboard access
  // 4. Log affiliate registration

  return res.status(201).json({
    success: true,
    affiliate: newAffiliate,
    message: 'Affiliate registration successful'
  });
}

function trackReferral(req, res) {
  const { referralCode, newUserEmail, purchaseAmount = 0 } = req.body;

  if (!referralCode || !newUserEmail) {
    return res.status(400).json({ error: 'Referral code and user email are required' });
  }

  const affiliate = affiliateData.find(a => a.referralCode === referralCode);
  if (!affiliate) {
    return res.status(404).json({ error: 'Invalid referral code' });
  }

  // Calculate commission (10% of purchase amount or $30 flat rate)
  const commission = Math.max(purchaseAmount * 0.1, 30.00);

  const newTransaction = {
    id: nextTransactionId++,
    affiliateId: affiliate.id,
    referredUserId: Math.floor(Math.random() * 1000), // Mock user ID
    referredUserEmail: newUserEmail,
    commission,
    status: 'pending',
    createdAt: new Date().toISOString(),
    paidAt: null
  };

  referralTransactions.push(newTransaction);

  // Update affiliate stats
  affiliate.totalReferrals += 1;
  affiliate.pendingEarnings += commission;

  // In production:
  // 1. Save transaction to database
  // 2. Update affiliate earnings
  // 3. Send notification to affiliate
  // 4. Apply discount to new user
  // 5. Schedule commission payout

  return res.status(201).json({
    success: true,
    transaction: newTransaction,
    message: 'Referral tracked successfully'
  });
}

function handleUpdateAffiliate(req, res, action) {
  switch (action) {
    case 'payout':
      return processAffiliatePayout(req, res);
    
    case 'status':
      return updateAffiliateStatus(req, res);
    
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
}

function processAffiliatePayout(req, res) {
  const { affiliateId, amount } = req.body;

  if (!affiliateId || !amount) {
    return res.status(400).json({ error: 'Affiliate ID and amount are required' });
  }

  const affiliateIndex = affiliateData.findIndex(a => a.id === parseInt(affiliateId));
  if (affiliateIndex === -1) {
    return res.status(404).json({ error: 'Affiliate not found' });
  }

  const affiliate = affiliateData[affiliateIndex];

  if (affiliate.pendingEarnings < amount) {
    return res.status(400).json({ error: 'Insufficient pending earnings' });
  }

  // Process payout
  affiliate.pendingEarnings -= amount;
  affiliate.totalEarnings += amount;
  affiliate.lastPayout = new Date().toISOString();

  // Update related transactions
  referralTransactions
    .filter(t => t.affiliateId === affiliate.id && t.status === 'pending')
    .slice(0, Math.ceil(amount / 30)) // Approximate number of transactions
    .forEach(t => {
      t.status = 'paid';
      t.paidAt = new Date().toISOString();
    });

  // In production:
  // 1. Process actual payment via payment gateway
  // 2. Update database records
  // 3. Send payout confirmation email
  // 4. Log payout in audit trail

  return res.status(200).json({
    success: true,
    payout: {
      affiliateId,
      amount,
      paidAt: affiliate.lastPayout
    },
    affiliate,
    message: 'Payout processed successfully'
  });
}

function updateAffiliateStatus(req, res) {
  const { affiliateId, status } = req.body;

  if (!affiliateId || !['active', 'suspended', 'terminated'].includes(status)) {
    return res.status(400).json({ error: 'Valid affiliate ID and status are required' });
  }

  const affiliateIndex = affiliateData.findIndex(a => a.id === parseInt(affiliateId));
  if (affiliateIndex === -1) {
    return res.status(404).json({ error: 'Affiliate not found' });
  }

  affiliateData[affiliateIndex].status = status;

  // In production:
  // 1. Update database
  // 2. Send status change notification
  // 3. Log status change in audit trail

  return res.status(200).json({
    success: true,
    affiliate: affiliateData[affiliateIndex],
    message: `Affiliate status updated to ${status}`
  });
}