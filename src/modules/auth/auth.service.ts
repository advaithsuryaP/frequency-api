import { JwtService } from '@nestjs/jwt';
import { SignInResponse } from './types/sign-in.response';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserQueryService } from '../users/adapters/user-query/user-query.service';
import { LogEventService } from 'src/common/log/adapters/log-event/log-event.service';
import { JwtPayload } from './types/jwt.payload';
import { PublicUser } from '../users/dto/public-user.interface';
import rjwtConfig from 'src/config/rjwt.config';
import type { ConfigType } from '@nestjs/config';
import { UserUpdateService } from '../users/adapters/user-update/user-update.service';
import { AuthUserContract } from '../users/adapters/contracts/auth-user.contract';
import { RefreshTokenResponse } from './types/refresh-token.response';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly hashingService: HashingService,
        private readonly logEventService: LogEventService,
        private readonly userQueryService: UserQueryService,
        private readonly userUpdateService: UserUpdateService,
        @Inject(rjwtConfig.KEY) private readonly rjwtConfiguration: ConfigType<typeof rjwtConfig>
    ) {}

    async login(user: PublicUser): Promise<SignInResponse> {
        const { accessToken, refreshToken } = await this._generateTokens(user.id);

        const hashedRefreshToken = await this.hashingService.hash(refreshToken);
        await this.userUpdateService.updateRefreshToken(user.id, hashedRefreshToken);

        await this.logEventService.loginEvent({
            userId: user.id,
            message: `${user.username} logged in to the system`
        });

        return {
            accessToken,
            refreshToken,
            user
        };
    }

    async validateUser(username: string, password: string): Promise<PublicUser> {
        const user: AuthUserContract | null = await this.userQueryService.findUserByUsername(username);
        if (!user) throw new UnauthorizedException('Invalid username or password');

        const ok = await this.hashingService.verify(password, user.hashedPassword);
        if (!ok) throw new UnauthorizedException('Invalid username or password');

        const { hashedPassword, refreshToken, ...publicUser } = user;

        return publicUser;
    }

    async refreshToken(userId: string): Promise<RefreshTokenResponse> {
        const { accessToken, refreshToken } = await this._generateTokens(userId);

        const hashedRefreshToken = await this.hashingService.hash(refreshToken);
        await this.userUpdateService.updateRefreshToken(userId, hashedRefreshToken);

        return {
            accessToken,
            refreshToken
        };
    }

    async validateRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
        const user: AuthUserContract | null = await this.userQueryService.findUserById(userId);
        if (!user || !user.refreshToken) throw new UnauthorizedException('Invalid refresh token');

        const ok = await this.hashingService.verify(refreshToken, user.refreshToken);
        if (!ok) throw new UnauthorizedException('Invalid refresh token');

        return ok;
    }

    private async _generateTokens(userId: string): Promise<{ accessToken: string; refreshToken: string }> {
        const payload: JwtPayload = { sub: userId };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.rjwtConfiguration)
        ]);
        return { accessToken, refreshToken };
    }
}
