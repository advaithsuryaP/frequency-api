import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentsModule } from './modules/agents/agents.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { HashingModule } from './common/hashing/hashing.module';

@Module({
    imports: [
        AgentsModule,
        PostsModule,
        UsersModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => databaseConfig(configService),
            inject: [ConfigService]
        }),
        AuthModule,
        HashingModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
