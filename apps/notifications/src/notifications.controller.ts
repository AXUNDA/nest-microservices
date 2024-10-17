import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @UsePipes(new ValidationPipe())
  @EventPattern('notify_user')
  async notifyUser(@Payload() dto: NotifyEmailDto) {
    await this.notificationsService.notifyUser(dto);
  }
}
