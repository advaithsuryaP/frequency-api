import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserQueryService } from '../users/adapters/user-query/user-query.service';
import { JwtContract } from './contracts/jwt.contract';
import { JwtService } from '@nestjs/jwt';
import { SignInResponse } from './dto/sign-in.response';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly hashingService: HashingService,
        private readonly userQueryService: UserQueryService
    ) {}

    async login(signInDto: SignInDto): Promise<SignInResponse> {
        const user = await this.userQueryService.findUserByUsername(signInDto.username);

        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const ok = await this.hashingService.compare(signInDto.password, user.hashedPassword);
        if (!ok) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const payload: JwtContract = {
            sub: user.id,
            username: user.username
        };

        const accessToken = await this.jwtService.signAsync(payload);

        const { hashedPassword, ...publicUser } = user;
        return {
            accessToken,
            user: publicUser
        };
    }
}
