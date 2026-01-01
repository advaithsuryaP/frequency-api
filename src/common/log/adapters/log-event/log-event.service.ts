import { Injectable } from '@nestjs/common';
import { LogService } from '../../log.service';
import { CreateLogDto } from '../../dto/create-log.dto';
import { LogEntity } from '../../entities/log.entity';
import { EventModule, LogLevel } from '../../enums/log.enum';

@Injectable()
export class LogEventService {
    constructor(private readonly logService: LogService) {}

    async loginEvent(userId: string, message: string): Promise<LogEntity | null> {
        const log = new CreateLogDto();

        log.userId = userId;
        log.message = message;
        log.level = LogLevel.INFO;
        log.module = EventModule.AUTH;

        return await this.logService.create(log);
    }
}
