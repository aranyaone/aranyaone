import { NextResponse } from 'next/server';

// QR Payment API - Handles multiple countries, currencies, and payment methods
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      country, 
      currency, 
      amount, 
      bank, 
      wallet, 
      paymentMethod,
      qrFormat 
    } = body;

    // Validate required fields
    if (!country || !currency || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: country, currency, amount' },
        { status: 400 }
      );
    }

    // Generate unique payment ID
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Country-specific payment processing
    const paymentData = await processPaymentByCountry({
      country,
      currency,
      amount,
      bank,
      wallet,
      paymentMethod,
      qrFormat,
      paymentId
    });

    return NextResponse.json({
      success: true,
      paymentId,
      qrData: paymentData.qrData,
      paymentUrl: paymentData.paymentUrl,
      supportedMethods: paymentData.supportedMethods,
      estimatedTime: paymentData.estimatedTime
    });

  } catch (error) {
    console.error('QR Payment API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Process payment based on country
async function processPaymentByCountry(paymentInfo) {
  const { country, currency, amount, bank, wallet, qrFormat, paymentId } = paymentInfo;

  // Country-specific configurations
  const countryConfigs = {
    IN: {
      // India - UPI
      qrData: {
        type: 'UPI',
        vpa: `bujji-chat@${bank?.toLowerCase() || 'upi'}`,
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        merchantCode: 'BUJJI001',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `upi://pay?pa=bujji-chat@${bank?.toLowerCase() || 'upi'}&am=${amount}&cu=${currency}&tn=Bujji Chat Payment`,
      supportedMethods: ['UPI', 'Bank Transfer', 'Digital Wallets'],
      estimatedTime: '2-5 minutes'
    },
    US: {
      // United States - EMV QR
      qrData: {
        type: 'EMV',
        merchantId: 'BUJJI_US_001',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/us/${paymentId}`,
      supportedMethods: ['Credit Card', 'Debit Card', 'Digital Wallets'],
      estimatedTime: '1-3 minutes'
    },
    UK: {
      // United Kingdom - EMV QR
      qrData: {
        type: 'EMV',
        merchantId: 'BUJJI_UK_001',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/uk/${paymentId}`,
      supportedMethods: ['Credit Card', 'Debit Card', 'Digital Wallets'],
      estimatedTime: '1-3 minutes'
    },
    CN: {
      // China - UnionPay QR
      qrData: {
        type: 'UnionPay',
        merchantId: 'BUJJI_CN_001',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/cn/${paymentId}`,
      supportedMethods: ['WeChat Pay', 'Alipay', 'UnionPay'],
      estimatedTime: '1-2 minutes'
    },
    JP: {
      // Japan - JPQR
      qrData: {
        type: 'JPQR',
        merchantId: 'BUJJI_JP_001',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/jp/${paymentId}`,
      supportedMethods: ['PayPay', 'LINE Pay', 'Rakuten Pay'],
      estimatedTime: '1-2 minutes'
    },
    SG: {
      // Singapore - PayNow
      qrData: {
        type: 'PayNow',
        uen: 'T01SS1234A',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/sg/${paymentId}`,
      supportedMethods: ['PayNow', 'Credit Card', 'Digital Wallets'],
      estimatedTime: '1-3 minutes'
    },
    AU: {
      // Australia - PayID
      qrData: {
        type: 'PayID',
        payId: 'bujji-chat@payid',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/au/${paymentId}`,
      supportedMethods: ['PayID', 'Osko', 'Credit Card'],
      estimatedTime: '1-3 minutes'
    },
    CA: {
      // Canada - Interac
      qrData: {
        type: 'Interac',
        merchantId: 'BUJJI_CA_001',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/ca/${paymentId}`,
      supportedMethods: ['Interac e-Transfer', 'Credit Card', 'Digital Wallets'],
      estimatedTime: '1-3 minutes'
    },
    DE: {
      // Germany - SEPA
      qrData: {
        type: 'SEPA',
        iban: 'DE89370400440532013000',
        bic: 'COBADEFFXXX',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/de/${paymentId}`,
      supportedMethods: ['SEPA Transfer', 'Credit Card', 'Digital Wallets'],
      estimatedTime: '1-2 business days'
    },
    BR: {
      // Brazil - Pix
      qrData: {
        type: 'Pix',
        pixKey: 'bujji-chat@pix.com.br',
        amount: amount,
        currency: currency,
        merchant: 'Bujji Chat',
        paymentId: paymentId,
        timestamp: new Date().toISOString()
      },
      paymentUrl: `https://pay.bujji-chat.com/br/${paymentId}`,
      supportedMethods: ['Pix', 'Credit Card', 'Digital Wallets'],
      estimatedTime: '1-2 minutes'
    }
  };

  const config = countryConfigs[country] || countryConfigs.US;
  
  // Add wallet-specific data if provided
  if (wallet) {
    config.qrData.wallet = wallet;
    config.qrData.walletId = `BUJJI_${country}_${wallet.toUpperCase()}`;
  }

  // Add bank-specific data if provided
  if (bank) {
    config.qrData.bank = bank;
    config.qrData.bankCode = `BUJJI_${country}_${bank.toUpperCase().replace(/\s+/g, '')}`;
  }

  return config;
}

// GET endpoint for payment status
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Simulate payment status check
    const statuses = ['pending', 'processing', 'completed', 'failed'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return NextResponse.json({
      paymentId,
      status: randomStatus,
      timestamp: new Date().toISOString(),
      message: `Payment ${randomStatus}`
    });

  } catch (error) {
    console.error('Payment Status API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 