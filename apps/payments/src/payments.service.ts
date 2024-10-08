import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { create_charge } from './dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'), {
    apiVersion: '2024-09-30.acacia',
  });
  constructor(private readonly config: ConfigService) {}
  async createCharge({ card, amount }: create_charge) {
    const PaymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });
    const PaymentIntent = await this.stripe.paymentIntents.create({
      payment_method: PaymentMethod.id,
      amount: amount * 100,
      currency: 'usd',
      confirm: true,
      payment_method_types: ['card'],
    });

    return PaymentIntent;
  }
}
