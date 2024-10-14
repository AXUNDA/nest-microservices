import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { cardDto } from './card.dto';
import { Type } from 'class-transformer';

export class create_charge {
  @IsDefined()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => cardDto)
  card: cardDto;

  @IsNumber()
  amount: number;
}
