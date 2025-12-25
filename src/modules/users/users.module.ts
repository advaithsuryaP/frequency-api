import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { UserQueryService } from './adapters/user-query/user-query.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), HashingModule],
    controllers: [UsersController],
    providers: [UsersService, UserQueryService],
    exports: [UserQueryService]
})
export class UsersModule {}
