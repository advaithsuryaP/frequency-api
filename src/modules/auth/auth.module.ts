import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LogModule } from 'src/common/log/log.module';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

import jwtConfig from 'src/config/jwt.config';
import rjwtConfig from 'src/config/rjwt.config';
import { RjwtStrategy } from './strategies/rjwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RoleAuthGuard } from './guards/role-auth/role-auth.guard';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, RjwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: RoleAuthGuard
        }
    ],
    imports: [
        LogModule,
        UsersModule,
        HashingModule,
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(rjwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider())
    ]
})
export class AuthModule { }
