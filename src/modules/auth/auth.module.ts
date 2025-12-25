import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [HashingModule, UsersModule]
})
export class AuthModule {}
