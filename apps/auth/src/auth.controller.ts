import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';

import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetCurrentUser } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @GetCurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(user, res);
    return res.send(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @MessagePattern('authenticate')
  async authenticate(@Payload() dto: any) {
    return dto.user;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('logout')
  // logout(@Res({ passthrough: true }) res: Response) {
  //   return res.clearCookie('Authentication').send();
  // }
}
