import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Usuario } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      // signOptions: {expiresIn: '60s'}
    }),
  ]
})
export class AuthModule {}
