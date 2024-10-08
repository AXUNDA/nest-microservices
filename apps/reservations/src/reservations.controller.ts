import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './reservation/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservation/dto/update-reservation.dto';
import { GetCurrentUser, JwtAuthGuard, userDto } from '@app/common';
@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @GetCurrentUser() user: userDto,
  ) {
    return this.reservationService.create(createReservationDto, user._id);
  }

  @Get()
  async findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
