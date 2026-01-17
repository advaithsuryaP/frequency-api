import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import rjwtConfig from 'src/config/rjwt.config';
import { JwtPayload } from '../interfaces/jwt.payload';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { PublicUser } from 'src/modules/users/interfaces/public-user.interface';

@Injectable()
export class RjwtStrategy extends PassportStrategy(Strategy, 'rjwt') {
    constructor(
        @Inject(rjwtConfig.KEY) private readonly rjwtConfiguration: ConfigType<typeof rjwtConfig>,
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: rjwtConfiguration.secret as string,
            ignoreExpiration: false,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: JwtPayload): Promise<PublicUser> {
        const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
        if (!refreshToken) throw new UnauthorizedException('Invalid refresh token');

        const userId: string = payload.sub;
        const user: PublicUser = await this.authService.validateRefreshToken(userId, refreshToken);
        return user;
    }
}
