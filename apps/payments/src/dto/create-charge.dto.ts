import Stripe from 'stripe';

export class create_charge {
  card: Stripe.PaymentMethodCreateParams.Card;
  amount: number;
}
