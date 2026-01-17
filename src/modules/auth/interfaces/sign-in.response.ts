import { PublicUser } from 'src/modules/users/interfaces/public-user.interface';

export interface SignInResponse {
    accessToken: string;
    refreshToken: string;
    user: PublicUser;
}
