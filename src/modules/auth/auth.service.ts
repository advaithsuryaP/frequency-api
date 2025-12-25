import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserQueryService } from '../users/adapters/user-query/user-query.service';
import { PublicUser } from '../users/dto/public-user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly hashingService: HashingService,
        private readonly userQueryService: UserQueryService
    ) {}

    async login(userLoginDto: UserLoginDto): Promise<PublicUser> {
        const user = await this.userQueryService.getAuthUserContract(userLoginDto.username);

        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const ok = await this.hashingService.compare(userLoginDto.password, user.password);
        if (!ok) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const { password, ...publicUser } = user;
        return publicUser;
    }
}
