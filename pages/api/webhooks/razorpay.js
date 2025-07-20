// Razorpay webhook endpoint for payment processing
export default function handler(req, res) {
  // Set security headers
  res.setHeader('Access-Control-Allow-Origin', 'https://api.razorpay.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Razorpay-Signature');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const signature = req.headers['x-razorpay-signature'];
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
      
      if (!webhookSecret) {
        console.error('Razorpay webhook secret not configured');
        return res.status(500).json({ error: 'Webhook secret not configured' });
      }

      // Basic signature validation (in production, use crypto to verify signature)
      if (!signature) {
        console.error('Missing Razorpay signature');
        return res.status(400).json({ error: 'Missing signature' });
      }

      const { event, payload } = req.body;
      
      // Handle different webhook events
      switch (event) {
        case 'payment.captured':
          console.log('Payment captured:', payload.payment.entity.id);
          processPaymentCaptured(payload.payment.entity);
          break;
          
        case 'payment.failed':
          console.log('Payment failed:', payload.payment.entity.id);
          processPaymentFailed(payload.payment.entity);
          break;
          
        case 'subscription.activated':
          console.log('Subscription activated:', payload.subscription.entity.id);
          processSubscriptionActivated(payload.subscription.entity);
          break;
          
        case 'subscription.cancelled':
          console.log('Subscription cancelled:', payload.subscription.entity.id);
          processSubscriptionCancelled(payload.subscription.entity);
          break;
          
        case 'subscription.charged':
          console.log('Subscription charged:', payload.subscription.entity.id);
          processSubscriptionCharged(payload.subscription.entity, payload.payment.entity);
          break;
          
        default:
          console.log(`Unhandled event type: ${event}`);
      }

      res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('Razorpay webhook error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Helper functions for processing Razorpay webhook events
async function processPaymentCaptured(payment) {
  try {
    console.log(`Processing captured payment: ${payment.id}`);
    
    // Update order status
    // Send confirmation notification
    // Update user balance/credits
    
    const notificationData = {
      type: 'payment_captured',
      paymentId: payment.id,
      orderId: payment.order_id,
      amount: payment.amount / 100, // Convert paise to rupees
      currency: payment.currency,
      method: payment.method,
      timestamp: new Date().toISOString()
    };
    
    // Error-resilient Firebase notification
    if (process.env.FIREBASE_PROJECT_ID) {
      await sendFirebaseNotification(notificationData);
    }
    
    // Error-resilient email notification
    if (process.env.SMTP_HOST && payment.email) {
      await sendEmailNotification({
        to: payment.email,
        subject: 'Payment Successful - Aranya One',
        template: 'razorpay_payment_success',
        data: {
          amount: payment.amount / 100,
          currency: payment.currency.toUpperCase(),
          paymentId: payment.id,
          orderId: payment.order_id
        }
      });
    }
  } catch (error) {
    console.error('Error processing captured payment:', error);
    // Continue execution - don't fail webhook
  }
}

async function processPaymentFailed(payment) {
  try {
    console.log(`Processing failed payment: ${payment.id}`);
    
    // Update order status
    // Send failure notification
    // Trigger retry flow if applicable
    
    const notificationData = {
      type: 'payment_failed',
      paymentId: payment.id,
      orderId: payment.order_id,
      amount: payment.amount / 100,
      currency: payment.currency,
      errorCode: payment.error_code,
      errorDescription: payment.error_description,
      timestamp: new Date().toISOString()
    };
    
    if (process.env.FIREBASE_PROJECT_ID) {
      await sendFirebaseNotification(notificationData);
    }
    
    // Send failure notification email
    if (process.env.SMTP_HOST && payment.email) {
      await sendEmailNotification({
        to: payment.email,
        subject: 'Payment Failed - Aranya One',
        template: 'razorpay_payment_failed',
        data: {
          amount: payment.amount / 100,
          currency: payment.currency.toUpperCase(),
          errorDescription: payment.error_description || 'Payment could not be processed'
        }
      });
    }
  } catch (error) {
    console.error('Error processing failed payment:', error);
  }
}

async function processSubscriptionActivated(subscription) {
  try {
    console.log(`Processing activated subscription: ${subscription.id}`);
    
    // Update user subscription status
    // Activate premium features
    // Send welcome email
    
    const notificationData = {
      type: 'subscription_activated',
      subscriptionId: subscription.id,
      planId: subscription.plan_id,
      status: subscription.status,
      currentStart: subscription.current_start,
      currentEnd: subscription.current_end,
      timestamp: new Date().toISOString()
    };
    
    if (process.env.FIREBASE_PROJECT_ID) {
      await sendFirebaseNotification(notificationData);
    }
  } catch (error) {
    console.error('Error processing subscription activation:', error);
  }
}

async function processSubscriptionCancelled(subscription) {
  try {
    console.log(`Processing cancelled subscription: ${subscription.id}`);
    
    // Update user subscription status
    // Schedule feature deactivation
    // Send cancellation confirmation
    
    const notificationData = {
      type: 'subscription_cancelled',
      subscriptionId: subscription.id,
      planId: subscription.plan_id,
      status: subscription.status,
      endedAt: subscription.ended_at,
      timestamp: new Date().toISOString()
    };
    
    if (process.env.FIREBASE_PROJECT_ID) {
      await sendFirebaseNotification(notificationData);
    }
  } catch (error) {
    console.error('Error processing subscription cancellation:', error);
  }
}

async function processSubscriptionCharged(subscription, payment) {
  try {
    console.log(`Processing subscription charge: ${subscription.id} - Payment: ${payment.id}`);
    
    // Update billing records
    // Send invoice
    // Extend subscription period
    
    const notificationData = {
      type: 'subscription_charged',
      subscriptionId: subscription.id,
      paymentId: payment.id,
      amount: payment.amount / 100,
      currency: payment.currency,
      currentPeriodEnd: subscription.current_end,
      timestamp: new Date().toISOString()
    };
    
    if (process.env.FIREBASE_PROJECT_ID) {
      await sendFirebaseNotification(notificationData);
    }
  } catch (error) {
    console.error('Error processing subscription charge:', error);
  }
}

// Error-resilient Firebase notification (shared with Stripe)
async function sendFirebaseNotification(data) {
  try {
    // Firebase Admin SDK notification logic would go here
    // Using mock implementation for demo
    console.log('Firebase notification sent:', data);
    return { success: true };
  } catch (error) {
    console.error('Firebase notification failed:', error);
    // Don't throw - continue processing
    return { success: false, error: error.message };
  }
}

// Error-resilient Nodemailer notification (shared with Stripe)
async function sendEmailNotification(emailData) {
  try {
    // Nodemailer SMTP logic would go here
    // Using mock implementation for demo
    console.log('Email notification sent:', emailData);
    return { success: true };
  } catch (error) {
    console.error('Email notification failed:', error);
    // Don't throw - continue processing
    return { success: false, error: error.message };
  }
}