import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservation/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservation/dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE, userDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { tap, map } from 'rxjs';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, user: userDto) {
    // const payment_details = await this.paymentsService
    //   .send('create_charge', {
    //     ...createReservationDto.charge,
    //     email: user.email,
    //   })
    //   .toPromise();
    // console.log({ payment_details });
    // return { payment_details };
    return this.paymentsService
      .send('create_charge', {
        ...createReservationDto.charge,
        email: user.email,
      })
      .pipe(
        // tap((res) => (createReservationDto.invoiceId = res.id)),
        map((res) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            userId: user._id,
            timeStamp: new Date(),
          });
        }),
      );
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
