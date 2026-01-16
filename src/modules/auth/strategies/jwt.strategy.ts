import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';
import { JwtPayload } from '../types/jwt.payload';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret as string
        });
    }

    validate(payload: JwtPayload): { id: string } {
        return { id: payload.sub };
    }
}
