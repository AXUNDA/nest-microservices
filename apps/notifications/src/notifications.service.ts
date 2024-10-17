import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  async notifyUser(dto: NotifyEmailDto) {
    // Implementation of sending email notification
    console.log(`Sending email notification to ${dto.email}`);
  }
}
