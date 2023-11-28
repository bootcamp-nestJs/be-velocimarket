import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService)
  {}

  public async login( credentials: CredentialsDto ): Promise<{access_token: string}>{
    const {user_name, password} = credentials;

    // acá no es preciso validar el usuario porque eso ya lo hace el stragedy
    // asumimos que el usuario ya existe en este punto
    const user = await this.userService.findUserByUserName(user_name);
    const access_token = this.jwtService.sign(user);
    return {access_token};
  }

  public async checkCredentials( user_name: string, password: string ): Promise<any>{
    console.log("checkCredentials");
    try {
      const user = await this.userService.findUserByUserName(user_name);
      const passwordValid = await bcrypt.compare(password, user.user_name);
  
      if (!user) {
        throw new NotAcceptableException(`Usuario ${user_name} no encontrado`);
      }
        
      if (!passwordValid) {
        throw new NotAcceptableException(`Las contraseñas no coinciden`);
      }
      
      return user;

    } catch (error) {
      throw new InternalServerErrorException(`Error: ${error}`);
    }
  }
}
