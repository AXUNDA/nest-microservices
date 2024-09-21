import { Module } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ConfigModule, DatabaseModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationsDocument,
  ReservationsSchema,
} from './reservation/models/reservations.model';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    DatabaseModule.forFeature([
      {
        name: ReservationsDocument.name,
        schema: ReservationsSchema,
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationService, ReservationsRepository],
})
export class ReservationsModule {}
