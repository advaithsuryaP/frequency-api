import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUserContract } from '../contracts/auth-user.contract';

@Injectable()
export class UserQueryService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async findUserByUsername(username: string): Promise<AuthUserContract | null> {
        const user: UserEntity | null = await this.userRepository.findOne({
            where: { username },
            select: ['id', 'username', 'displayName', 'email', 'password', 'refreshToken', 'role']
        });
        if (!user) return null;

        return this._mapToAuthUserContract(user);
    }

    async findUserById(id: string): Promise<AuthUserContract | null> {
        const user: UserEntity | null = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'username', 'displayName', 'email', 'password', 'refreshToken', 'role']
        });
        if (!user) return null;
        return this._mapToAuthUserContract(user);
    }

    private _mapToAuthUserContract(user: UserEntity): AuthUserContract {
        return {
            id: user.id,
            role: user.role,
            email: user.email,
            username: user.username,
            displayName: user.displayName,
            hashedPassword: user.password,
            refreshToken: user.refreshToken
        };
    }
}
