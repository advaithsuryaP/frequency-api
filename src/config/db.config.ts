import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';
import { AppEnvironment } from 'src/utils/enum';

export const databaseConfig = (configService: ConfigService) => {
    const url = configService.get<string>('DATABASE_URL');
    if (!url) {
        throw new Error('DATABASE_URL is not configured');
    }

    const environment = configService.get<AppEnvironment>('NODE_ENV');

    return {
        url,
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: environment === AppEnvironment.DEVELOPMENT,
        entities: [__dirname + '/../modules/**/*.entity{.ts}'],
        ssl: { rejectUnauthorized: false }
    } as PostgresConnectionOptions;
};
