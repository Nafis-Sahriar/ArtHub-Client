import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID={
    'buyer_pro':'price_1TjsXGFCb2wV65V7SZ2DTmr6',
    'buyer_premium':'price_1TjtW9FCb2wV65V7nJxBPUN3'
}