import { UserEntity } from '../entities/user.entity';

export interface PublicUser extends Pick<UserEntity, 'id' | 'username' | 'displayName' | 'email'> {}
