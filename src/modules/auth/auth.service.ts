import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponse } from './dto/sign-in.response';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserQueryService } from '../users/adapters/user-query/user-query.service';
import { LogEventService } from 'src/common/log/adapters/log-event/log-event.service';
import { JwtPayload } from './types/jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly hashingService: HashingService,
        private readonly logEventService: LogEventService,
        private readonly userQueryService: UserQueryService
    ) {}

    // async login(userId: string): Promise<SignInResponse> {
    //     const payload: JwtContract = { sub: userId };

    //     const accessToken = await this.jwtService.signAsync(payload);

    //     await this.logEventService.loginEvent({
    //         userId: user.id,
    //         message: `${user.username} logged in to the system`
    //     });

    //     const { hashedPassword, ...publicUser } = user;
    //     return {
    //         accessToken,
    //         user: publicUser
    //     };
    // }

    async getAccessToken(userId: string): Promise<string> {
        const payload: JwtPayload = { sub: userId };
        return await this.jwtService.signAsync(payload);
    }

    async validateUser(username: string, password: string): Promise<{ id: string }> {
        const user = await this.userQueryService.findUserByUsername(username);
        if (!user) throw new UnauthorizedException('Invalid username or password');

        const ok = await this.hashingService.compare(password, user.hashedPassword);
        if (!ok) throw new UnauthorizedException('Invalid username or password');

        await this.logEventService.loginEvent({
            userId: user.id,
            message: `${user.username} logged in to the system`
        });

        return { id: user.id };
    }
}
