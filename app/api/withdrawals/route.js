import { NextResponse } from 'next/server';

// Withdrawal Management API - Advanced security and approval system
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      userId, 
      amount, 
      currency, 
      method, 
      bankDetails, 
      reason,
      priority = 'medium'
    } = body;

    // Validate required fields
    if (!userId || !amount || !currency || !method) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, amount, currency, method' },
        { status: 400 }
      );
    }

    // Generate unique withdrawal ID
    const withdrawalId = `WD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Security checks
    const securityChecks = await performSecurityChecks(userId, amount, currency, method);
    
    // Calculate fees and net amount
    const fee = calculateWithdrawalFee(amount, method, currency);
    const netAmount = amount - fee;

    // Determine initial status based on security checks
    let status = 'pending';
    if (securityChecks.riskScore > 80) {
      status = 'rejected';
    } else if (securityChecks.riskScore < 20 && securityChecks.identityVerified) {
      status = 'approved';
    }

    const withdrawalData = {
      id: withdrawalId,
      userId,
      amount,
      currency,
      method,
      bankDetails,
      reason,
      priority,
      status,
      fee,
      netAmount,
      securityChecks,
      timestamp: new Date().toISOString(),
      estimatedTime: getEstimatedTime(method),
      documents: generateRequiredDocuments(method, currency)
    };

    return NextResponse.json({
      success: true,
      withdrawalId,
      withdrawal: withdrawalData,
      message: `Withdrawal ${status} successfully`
    });

  } catch (error) {
    console.error('Withdrawal API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for withdrawal status and management
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const withdrawalId = searchParams.get('withdrawalId');
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');

    if (withdrawalId) {
      // Get specific withdrawal
      const withdrawal = await getWithdrawalById(withdrawalId);
      if (!withdrawal) {
        return NextResponse.json(
          { error: 'Withdrawal not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ withdrawal });
    }

    // Get filtered withdrawals
    const filters = { status, userId };
    const withdrawals = await getWithdrawals(filters);
    
    return NextResponse.json({
      withdrawals,
      total: withdrawals.length,
      filters
    });

  } catch (error) {
    console.error('Withdrawal Status API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT endpoint for updating withdrawal status
export async function PUT(request) {
  try {
    const body = await request.json();
    const { withdrawalId, action, reason, adminId } = body;

    if (!withdrawalId || !action || !adminId) {
      return NextResponse.json(
        { error: 'Missing required fields: withdrawalId, action, adminId' },
        { status: 400 }
      );
    }

    // Validate action
    const validActions = ['approve', 'reject', 'complete', 'cancel'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be one of: approve, reject, complete, cancel' },
        { status: 400 }
      );
    }

    // Update withdrawal status
    const updatedWithdrawal = await updateWithdrawalStatus(withdrawalId, action, reason, adminId);

    return NextResponse.json({
      success: true,
      withdrawal: updatedWithdrawal,
      message: `Withdrawal ${action}ed successfully`
    });

  } catch (error) {
    console.error('Withdrawal Update API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Security checks function
async function performSecurityChecks(userId, amount, currency, method) {
  // Simulate security checks
  const checks = {
    identityVerified: Math.random() > 0.1, // 90% success rate
    fraudCheck: Math.random() > 0.05 ? 'passed' : 'failed', // 95% success rate
    riskScore: Math.floor(Math.random() * 100), // 0-100 risk score
    locationMatch: Math.random() > 0.2, // 80% success rate
    deviceTrusted: Math.random() > 0.15, // 85% success rate
    transactionHistory: Math.random() > 0.1, // 90% success rate
    kycVerified: Math.random() > 0.05, // 95% success rate
    amlCheck: Math.random() > 0.02, // 98% success rate
    sanctionsCheck: Math.random() > 0.01, // 99% success rate
    velocityCheck: Math.random() > 0.1 // 90% success rate
  };

  // Calculate overall risk score
  const riskFactors = [
    checks.identityVerified ? 0 : 30,
    checks.fraudCheck === 'passed' ? 0 : 40,
    checks.locationMatch ? 0 : 20,
    checks.deviceTrusted ? 0 : 15,
    checks.transactionHistory ? 0 : 25,
    checks.kycVerified ? 0 : 35,
    checks.amlCheck ? 0 : 50,
    checks.sanctionsCheck ? 0 : 100,
    checks.velocityCheck ? 0 : 30
  ];

  checks.riskScore = Math.min(100, Math.max(0, checks.riskScore + riskFactors.reduce((a, b) => a + b, 0)));

  return checks;
}

// Calculate withdrawal fee
function calculateWithdrawalFee(amount, method, currency) {
  const feeRates = {
    bank: { percentage: 0.25, min: 5, max: 50 },
    wire: { percentage: 0.50, min: 25, max: 100 },
    paypal: { percentage: 0.30, min: 1, max: 30 },
    crypto: { percentage: 0.10, min: 1, max: 20 },
    card: { percentage: 0.35, min: 2, max: 35 },
    upi: { percentage: 0, min: 0, max: 0 },
    paynow: { percentage: 0, min: 0, max: 0 }
  };

  const rate = feeRates[method] || feeRates.bank;
  const fee = Math.max(rate.min, Math.min(rate.max, amount * rate.percentage / 100));
  
  return fee;
}

// Get estimated processing time
function getEstimatedTime(method) {
  const times = {
    bank: '1-3 business days',
    wire: 'Same day',
    paypal: 'Instant',
    crypto: '10-30 minutes',
    card: '2-5 business days',
    upi: 'Instant',
    paynow: 'Instant'
  };

  return times[method] || '1-3 business days';
}

// Generate required documents
function generateRequiredDocuments(method, currency) {
  const baseDocuments = [
    { name: 'ID Verification', status: 'pending' },
    { name: 'Bank Statement', status: 'pending' }
  ];

  const methodSpecificDocs = {
    bank: [{ name: 'Bank Account Details', status: 'pending' }],
    wire: [{ name: 'SWIFT/IBAN Details', status: 'pending' }],
    paypal: [{ name: 'PayPal Account Verification', status: 'pending' }],
    crypto: [{ name: 'Crypto Wallet Address', status: 'pending' }],
    card: [{ name: 'Card Details', status: 'pending' }],
    upi: [{ name: 'UPI ID Verification', status: 'pending' }],
    paynow: [{ name: 'PayNow ID Verification', status: 'pending' }]
  };

  const currencySpecificDocs = {
    USD: [{ name: 'US Tax Compliance', status: 'pending' }],
    EUR: [{ name: 'EU Compliance', status: 'pending' }],
    INR: [{ name: 'PAN Card Verification', status: 'pending' }],
    SGD: [{ name: 'Singapore Compliance', status: 'pending' }]
  };

  return [
    ...baseDocuments,
    ...(methodSpecificDocs[method] || []),
    ...(currencySpecificDocs[currency] || [])
  ];
}

// Mock database functions
async function getWithdrawalById(withdrawalId) {
  // Simulate database lookup
  const mockWithdrawal = {
    id: withdrawalId,
    userId: 'USER-001',
    amount: 50000,
    currency: 'USD',
    method: 'bank',
    status: 'pending',
    timestamp: new Date().toISOString()
  };
  
  return mockWithdrawal;
}

async function getWithdrawals(filters) {
  // Simulate database query with filters
  const mockWithdrawals = [
    {
      id: 'WD-001',
      userId: 'USER-001',
      amount: 50000,
      currency: 'USD',
      method: 'bank',
      status: 'pending',
      timestamp: new Date().toISOString()
    },
    {
      id: 'WD-002',
      userId: 'USER-002',
      amount: 25000,
      currency: 'EUR',
      method: 'wire',
      status: 'approved',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  return mockWithdrawals.filter(w => {
    if (filters.status && w.status !== filters.status) return false;
    if (filters.userId && w.userId !== filters.userId) return false;
    return true;
  });
}

async function updateWithdrawalStatus(withdrawalId, action, reason, adminId) {
  // Simulate database update
  const statusMap = {
    approve: 'approved',
    reject: 'rejected',
    complete: 'completed',
    cancel: 'cancelled'
  };

  const updatedWithdrawal = {
    id: withdrawalId,
    status: statusMap[action],
    updatedBy: adminId,
    updatedAt: new Date().toISOString(),
    reason: reason || `Withdrawal ${action}ed by admin`
  };

  return updatedWithdrawal;
} 