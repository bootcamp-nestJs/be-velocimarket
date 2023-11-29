import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'src/controllers/users/users.service';
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
    // acá no es preciso validar el usuario porque eso ya lo hace el strategy
    // asumimos que el usuario ya existe en este punto
    const user = await this.userService.findUserByUserName(credentials.user_name);
    const {id, user_name, mail} = user;
    const access_token = this.jwtService.sign({id, user_name, mail});
    return {access_token};
  }

  public async checkCredentials( user_name: string, password: string ): Promise<any>{
    const user = await this.userService.findUserByUserName(user_name);
    const pass = await this.userService.getUserPassword(user.id);
    
    const passwordValid = await bcrypt.compare(password, pass);
    console.log(passwordValid)

    if (!passwordValid) {
      throw new NotAcceptableException(`Las contraseñas no coinciden`);
    }
    
    return user;
  }
}
