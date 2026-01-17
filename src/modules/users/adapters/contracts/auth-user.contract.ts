import { UserEntity } from '../../entities/user.entity';

export interface AuthUserContract extends Pick<
    UserEntity,
    'id' | 'username' | 'displayName' | 'email' | 'refreshToken' | 'role' | 'createdAt' | 'updatedAt'
> {
    hashedPassword: string;
}
