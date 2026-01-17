import { AuthUserContract } from "../adapters/contracts/auth-user.contract";
import { UserEntity } from "../entities/user.entity";
import { PublicUser } from "../interfaces/public-user.interface";

export const toPublicUser = (user: AuthUserContract | UserEntity): PublicUser => {
    return {
        id: user.id,
        role: user.role,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        displayName: user.displayName,
    };
};