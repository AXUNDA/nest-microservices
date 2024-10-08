import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

import { UserDocument } from './models/users.schema';
import { GetCurrentUser } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUser(@GetCurrentUser() user: UserDocument) {
    return user;
  }
}
