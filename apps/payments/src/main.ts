import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const config = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [config.getOrThrow('RABBITMQ_URI')],
      queue: 'payments',
    },
  });
  app.useLogger(app.get(Logger));
  app.startAllMicroservices();
  // await app.listen(3003);
}
bootstrap();
