
// backend/controllers/stripeController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Creates a subscription payment session.
 * @param {Object} customerData - Data about the customer.
 * @param {Object} subscriptionPlan - Details of the plan.
 * @returns {Promise<Object>} - Stripe subscription session.
 */
const createSubscriptionSession = async (customerData, subscriptionPlan) => {
  const customer = await stripe.customers.create(customerData);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: subscriptionPlan.priceId, quantity: 1 }],
    mode: 'subscription',
    customer: customer.id,
    success_url: `${process.env.BASE_URL}/success`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
  });

  return session;
};

module.exports = { createSubscriptionSession };
