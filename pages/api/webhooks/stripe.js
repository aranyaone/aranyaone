// Stripe webhook endpoint for payment processing
export default function handler(req, res) {
  // Set security headers
  res.setHeader('Access-Control-Allow-Origin', 'https://api.stripe.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Stripe-Signature');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const sig = req.headers['stripe-signature'];
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
      
      if (!endpointSecret) {
        console.error('Stripe webhook secret not configured');
        return res.status(500).json({ error: 'Webhook secret not configured' });
      }

      // Basic signature validation (in production, use stripe.webhooks.constructEvent)
      if (!sig) {
        console.error('Missing Stripe signature');
        return res.status(400).json({ error: 'Missing signature' });
      }

      const { type, data } = req.body;
      
      // Handle different webhook events
      switch (type) {
        case 'payment_intent.succeeded':
          console.log('Payment succeeded:', data.object.id);
          // Process successful payment
          processSuccessfulPayment(data.object);
          break;
          
        case 'payment_intent.payment_failed':
          console.log('Payment failed:', data.object.id);
          // Handle failed payment
          processFailedPayment(data.object);
          break;
          
        case 'customer.subscription.created':
          console.log('Subscription created:', data.object.id);
          // Handle new subscription
          processNewSubscription(data.object);
          break;
          
        case 'customer.subscription.deleted':
          console.log('Subscription cancelled:', data.object.id);
          // Handle subscription cancellation
          processSubscriptionCancellation(data.object);
          break;
          
        default:
          console.log(`Unhandled event type: ${type}`);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Stripe webhook error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Helper functions for processing webhook events
async function processSuccessfulPayment(paymentIntent) {
  try {
    // Update database with successful payment
    // Send confirmation email
    // Update user subscription status
    console.log(`Processing successful payment: ${paymentIntent.id}`);
    
    // Error-resilient notification using Firebase
    if (process.env.FIREBASE_PROJECT_ID) {
      await sendFirebaseNotification({
        type: 'payment_success',
        userId: paymentIntent.metadata?.userId,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        timestamp: new Date().toISOString()
      });
    }
    
    // Error-resilient email using Nodemailer
    if (process.env.SMTP_HOST) {
      await sendEmailNotification({
        to: paymentIntent.receipt_email,
        subject: 'Payment Confirmation',
        template: 'payment_success',
        data: {
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency.toUpperCase()
        }
      });
    }
  } catch (error) {
    console.error('Error processing successful payment:', error);
    // Continue execution - don't fail webhook
  }
}

async function processFailedPayment(paymentIntent) {
  try {
    console.log(`Processing failed payment: ${paymentIntent.id}`);
    
    // Retry logic for failed payments
    // Send failure notification
    // Update user status
    
    if (process.env.FIREBASE_PROJECT_ID) {
      await sendFirebaseNotification({
        type: 'payment_failed',
        userId: paymentIntent.metadata?.userId,
        amount: paymentIntent.amount,
        error: paymentIntent.last_payment_error?.message,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error processing failed payment:', error);
  }
}

async function processNewSubscription(subscription) {
  try {
    console.log(`Processing new subscription: ${subscription.id}`);
    // Update user subscription status
    // Send welcome email
    // Activate premium features
  } catch (error) {
    console.error('Error processing new subscription:', error);
  }
}

async function processSubscriptionCancellation(subscription) {
  try {
    console.log(`Processing subscription cancellation: ${subscription.id}`);
    // Update user subscription status
    // Send cancellation confirmation
    // Schedule feature deactivation
  } catch (error) {
    console.error('Error processing subscription cancellation:', error);
  }
}

// Error-resilient Firebase notification
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

// Error-resilient Nodemailer notification
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