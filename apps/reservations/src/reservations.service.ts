import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservation/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservation/dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  create(createReservationDto: CreateReservationDto, userId: string) {
    console.log(createReservationDto);
    return this.reservationsRepository.create({
      ...createReservationDto,
      userId,
      timeStamp: new Date(),
    });
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(id: string) {
    return this.reservationsRepository.findOne({ _id: id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
