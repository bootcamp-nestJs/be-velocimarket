import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user_name: string, password: string): Promise<any> {
    console.log("validate");
    const user = await this.authService.checkCredentials(user_name, password);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}