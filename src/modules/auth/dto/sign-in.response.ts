import { PublicUser } from 'src/modules/users/dto/public-user.interface';

export interface SignInResponse {
    accessToken: string;
    user: PublicUser;
}
