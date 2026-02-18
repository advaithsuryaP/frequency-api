import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostEntity } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [TypeOrmModule.forFeature([PostEntity]), UsersModule]
})
export class PostsModule {}
