import { create_charge } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentsCreateCharge extends create_charge {
  @IsEmail()
  email: string;
}
