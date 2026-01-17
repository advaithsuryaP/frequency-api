import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/config/jwt.config';
import { JwtPayload } from '../interfaces/jwt.payload';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PublicUser } from 'src/modules/users/interfaces/public-user.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret as string,
            ignoreExpiration: false
        });
    }

    async validate(payload: JwtPayload): Promise<PublicUser> {
        const userId: string = payload.sub;
        return await this.authService.validateJWT(userId);
    }
}
