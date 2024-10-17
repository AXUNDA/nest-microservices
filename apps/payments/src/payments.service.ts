import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

import { NOTIFICATIONS } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateCharge } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'), {
    apiVersion: '2024-09-30.acacia',
  });
  constructor(
    private readonly config: ConfigService,
    @Inject(NOTIFICATIONS) private readonly notificationsService: ClientProxy,
  ) {}
  async createCharge({ amount, email }: PaymentsCreateCharge) {
    // const PaymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });
    const PaymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: PaymentMethod.id,
      // amount: amount * 100,
      // currency: 'usd',
      // confirm: true,
      // payment_method_types: ['card'],
      amount: amount * 100,
      currency: 'usd',
      payment_method: 'pm_card_visa',
    });

    this.notificationsService.emit('notify_user', {
      email,
    });

    return PaymentIntent;
  }
}
