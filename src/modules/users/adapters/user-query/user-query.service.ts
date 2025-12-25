import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserContract } from '../contracts/auth-user.contract';

@Injectable()
export class UserQueryService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async getAuthUserContract(username: string): Promise<AuthUserContract | null> {
        const user = await this.userRepository.findOne({
            where: { username },
            select: ['id', 'username', 'displayName', 'email', 'password']
        });
        return user;
    }
}
