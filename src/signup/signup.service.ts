import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSignupDto } from './dto/create-signup.dto';
import { Signup, SignupI } from './interfaces/signup-interfaces';
import { v4 as uuid } from 'uuid';
import { UsersService } from '../users/users.service';

@Injectable()
export class SignupService implements SignupI{
constructor(private readonly UsersService: UsersService){}
  createUser( newUser: CreateSignupDto) {
    try {
      const newUserDto = {
        id: uuid(),
        fechaCreacion: Date(),
        ...newUser
      }
      this.UsersService.listUsers.push(newUserDto);
      return "creado" ;
      
    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }

 
}
