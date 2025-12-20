import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentsModule } from './agents/agents.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [AgentsModule, PostsModule, UsersModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
