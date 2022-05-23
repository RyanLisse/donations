import Stripe from 'stripe'
import { stripe } from '@libs/stripe'

const ORIGIN_URL = 'https://localhost:3000' ?? 'https://youarerad.org'

export async function createOneTimeDonation(amount: number) {
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'donate',
    payment_method_types: ['card', 'us_bank_account'],
    line_items: [
      {
        name: 'Donation',
        amount: amount,
        currency: 'usd',
        quantity: 1,
      },
    ],
    success_url: `${ORIGIN_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${ORIGIN_URL}/cancel`,
  }
  return await stripe.checkout.sessions.create(params)
}
