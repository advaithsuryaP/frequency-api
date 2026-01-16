import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import rjwtConfig from 'src/config/rjwt.config';
import { JwtPayload } from '../types/jwt.payload';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class RjwtStrategy extends PassportStrategy(Strategy, 'rjwt') {
    constructor(@Inject(rjwtConfig.KEY) private readonly rjwtConfiguration: ConfigType<typeof rjwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: rjwtConfiguration.secret as string
        });
    }

    validate(payload: JwtPayload): { id: string } {
        return { id: payload.sub };
    }
}
