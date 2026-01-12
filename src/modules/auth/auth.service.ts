import { JwtService } from '@nestjs/jwt';
import { SignInResponse } from './dto/sign-in.response';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserQueryService } from '../users/adapters/user-query/user-query.service';
import { LogEventService } from 'src/common/log/adapters/log-event/log-event.service';
import { JwtPayload } from './types/jwt.payload';
import { PublicUser } from '../users/dto/public-user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly hashingService: HashingService,
        private readonly logEventService: LogEventService,
        private readonly userQueryService: UserQueryService
    ) {}

    async login(user: PublicUser): Promise<SignInResponse> {
        const payload: JwtPayload = { sub: user.id };
        const accessToken = await this.jwtService.signAsync(payload);

        await this.logEventService.loginEvent({
            userId: user.id,
            message: `${user.username} logged in to the system`
        });

        return {
            accessToken,
            user
        };
    }

    async validateUser(username: string, password: string): Promise<PublicUser> {
        const user = await this.userQueryService.findUserByUsername(username);
        if (!user) throw new UnauthorizedException('Invalid username or password');

        const ok = await this.hashingService.compare(password, user.hashedPassword);
        if (!ok) throw new UnauthorizedException('Invalid username or password');

        const { hashedPassword, ...publicUser } = user;

        return publicUser;
    }
}
