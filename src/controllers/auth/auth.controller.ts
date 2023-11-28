import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async singIn(@Body() credentials: CredentialsDto)  { // Promise<string>
    return this.authService.login(credentials);
  }

  @Post('signout')
  async singOut(@Body() data)  { // Promise<string>
    // const userCreatedId = await this.usersService.createUser(createUserDto);
    // return `Usuario ${userCreatedId} creado con éxito`;
    return 'saludos desde sign out'
  }

}
