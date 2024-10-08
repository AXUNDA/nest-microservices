import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/getUser-dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    await this.validateUserDo(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('invalid credentials');
    }
    return user;
  }
  async getUser(dto: GetUserDto) {
    return this.usersRepository.findOne({ _id: dto._id });
  }
  private async validateUserDo(dto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: dto.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }
}
