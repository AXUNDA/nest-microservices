import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { create_charge } from '../../../libs/common/src/dto/create-charge.dto';
import { PaymentsCreateCharge } from './dto/payments-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() dto: PaymentsCreateCharge) {
    return this.paymentsService.createCharge(dto);
  }
}
