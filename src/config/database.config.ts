import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostEntity } from 'src/posts/entities/post.entity';

export const databaseConfig = (configService: ConfigService) => {
    const url = configService.get<string>('DATABASE_URL');
    if (!url) {
        throw new Error('DATABASE_URL is not configured');
    }

    return {
        url,
        type: 'postgres',
        synchronize: true, // TODO: Remove in production
        autoLoadEntities: true,
        entities: [UserEntity, PostEntity],
        ssl: { rejectUnauthorized: false }
    } as PostgresConnectionOptions;
};
