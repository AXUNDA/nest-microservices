import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class cardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @IsNumber()
  exp_month: number;

  @IsNumber()
  exp_year: number;

  @IsString()
  @IsOptional()
  networks?: any;

  @IsCreditCard()
  number: string;

  @IsString()
  @IsOptional()
  token?: string;
}
