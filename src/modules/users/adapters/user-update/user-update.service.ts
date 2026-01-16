import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserUpdateService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async updateRefreshToken(id: string, refreshToken: string | null): Promise<boolean> {
        const updated = await this.userRepository.update(id, { refreshToken });
        return !!updated.affected && updated.affected > 0;
    }
}
