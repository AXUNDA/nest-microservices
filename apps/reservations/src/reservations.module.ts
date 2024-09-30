import { Module } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import * as Joi from 'joi';
import {
  ReservationsDocument,
  ReservationsSchema,
} from './reservation/models/reservations.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),

    DatabaseModule.forFeature([
      {
        name: ReservationsDocument.name,
        schema: ReservationsSchema,
      },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationService, ReservationsRepository],
})
export class ReservationsModule {}
