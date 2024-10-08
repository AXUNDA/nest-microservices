import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsEmail()
  @IsNotEmpty()
  _id: string;
}
