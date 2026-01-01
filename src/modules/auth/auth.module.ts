import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConfig } from 'src/config/jwt.config';
import { LogModule } from 'src/common/log/log.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        HashingModule,
        UsersModule,
        LogModule,
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => jwtConfig(configService)
        }),
        JwtModule
    ]
})
export class AuthModule {}
