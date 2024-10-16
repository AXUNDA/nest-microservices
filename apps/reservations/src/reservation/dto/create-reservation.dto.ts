import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  // IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { create_charge } from '@app/common';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  // @IsString()
  // @IsNotEmpty()
  // placeId: string;

  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  // invoiceId?: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => create_charge)
  charge: create_charge;
}
