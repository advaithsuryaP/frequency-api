import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserUpdateService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async updateRefreshToken(id: string, refreshToken: string): Promise<string | null> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) return null;
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);
        return user.refreshToken;
    }
}
