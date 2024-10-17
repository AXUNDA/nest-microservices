import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const config = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [config.getOrThrow('RABBITMQ_URI')],
      queue: 'notifications',
    },
  });
  app.useLogger(app.get(Logger));
  app.startAllMicroservices();
  // await app.listen(3003);
}
bootstrap();
