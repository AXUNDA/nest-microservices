import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}
  async login(user: UserDocument, res: Response) {
    const payload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() + this.config.get('JWT_EXPIRATION'),
    );

    const token = this.jwt.sign(payload);
    res.cookie('Authentication', token, { expires });
  }
}
