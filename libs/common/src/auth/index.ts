import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { userDto } from '../dto';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies.Authentication;
    console.log({ jwt });
    if (!jwt) return false;
    return this.authClient
      .send<userDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => (context.switchToHttp().getRequest().user = res)),
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
