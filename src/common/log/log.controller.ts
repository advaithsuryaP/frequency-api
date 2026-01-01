import { Controller, Get, Param } from '@nestjs/common';
import { LogService } from './log.service';
import { LogEntity } from './entities/log.entity';
import { UuidParamDto } from '../dto/uuid-param.dto';

@Controller('logs')
export class LogController {
    constructor(private readonly logService: LogService) {}

    @Get()
    async findAll(): Promise<LogEntity[]> {
        return await this.logService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: UuidParamDto): Promise<LogEntity> {
        const { id } = params;
        return await this.logService.findOne(id);
    }
}
