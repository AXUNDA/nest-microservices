import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { UserDocument, UsersSchema } from './models/users.schema';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UsersSchema,
      },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
