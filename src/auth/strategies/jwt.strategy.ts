import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserJwt } from "../interfaces/jwt-user.interface";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // ! acomodar despues
      secretOrKey: process.env.SECRET_KEY
    })
  }

  async validate(payload: UserJwt): Promise<UserJwt> {
    return payload;
  }
}