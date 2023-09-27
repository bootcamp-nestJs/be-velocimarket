import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignupService } from './signup.service';
import { CreateSignupDto } from './dto/create-signup.dto';
import { UpdateSignupDto } from './dto/update-signup.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  createUser(@Body() createSignupDto: CreateSignupDto) {
     this.signupService.createUser(createSignupDto);
    return { message: 'Usuario creado exitosamente' };
  }

  
}
