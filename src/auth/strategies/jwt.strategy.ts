import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from 'dotenv';
import { UserJwt } from "../interfaces/jwt-user.interface";

dotenv.config({ path: '.env.local' });

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // ! acomodar despues
      secretOrKey: process.env.SECRET_KEY
    })
  }

  async validate(payload: UserJwt): Promise<{user: UserJwt}> {
    return {user: payload}
  }
}