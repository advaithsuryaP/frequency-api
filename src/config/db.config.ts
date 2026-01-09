import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (configService: ConfigService) => {
    const url = configService.get<string>('DATABASE_URL');
    if (!url) {
        throw new Error('DATABASE_URL is not configured');
    }

    return {
        url,
        type: 'postgres',
        synchronize: true,
        autoLoadEntities: true,
        entities: [__dirname + '/../modules/**/*.entity{.ts}'],
        ssl: { rejectUnauthorized: false }
    } as PostgresConnectionOptions;
};
