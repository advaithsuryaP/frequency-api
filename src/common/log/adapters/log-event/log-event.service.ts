import { Injectable } from '@nestjs/common';
import { LogService } from '../../log.service';
import { LogEntity } from '../../entities/log.entity';
import { EventModule, LogLevel } from '../../enums/log.enum';
import { AppEventContract } from '../contracts/app-event.contract';

@Injectable()
export class LogEventService {
    constructor(private readonly logService: LogService) {}

    async loginEvent(contract: AppEventContract): Promise<LogEntity> {
        return await this.logService.create({
            message: contract.message,
            userId: contract.userId,
            level: LogLevel.INFO,
            module: EventModule.AUTH
        });
    }
}
