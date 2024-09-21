import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { ReservationsDocument } from './reservation/models/reservations.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationsDocument> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationsDocument.name)
    reservationsModel: Model<ReservationsDocument>,
  ) {
    super(reservationsModel);
  }
}
