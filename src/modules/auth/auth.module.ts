import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LogModule } from 'src/common/log/log.module';
import { LocalStrategy } from './strategies/local.strategy';
import jwtConfig from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    imports: [
        LogModule,
        UsersModule,
        HashingModule,
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider())
    ]
})
export class AuthModule {}
