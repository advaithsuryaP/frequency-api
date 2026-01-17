import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../enum/role.enum';
import { ROLES_KEY } from '../../decorators/roles.decorators';
import { PublicUser } from 'src/modules/users/interfaces/public-user.interface';

@Injectable()
export class RoleAuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<[RoleEnum, ...RoleEnum[]]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const user: PublicUser = context.switchToHttp().getRequest().user;
        const hasRequiredRoles = requiredRoles.some(role => user.role === role);
        return hasRequiredRoles;
    }
}
