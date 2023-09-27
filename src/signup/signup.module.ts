import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
  exports: [SignupService],
  imports: [UsersModule]
})
export class SignupModule {}
