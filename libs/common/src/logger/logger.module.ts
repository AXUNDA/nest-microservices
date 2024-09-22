import { LoggerModule as Logger } from 'nestjs-pino';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    Logger.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
