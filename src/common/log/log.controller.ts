import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { LogEntity } from './entities/log.entity';
import { UuidParamDto } from '../dto/uuid-param.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('logs')
export class LogController {
    constructor(private readonly logService: LogService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Query() paginationDto: PaginationDto): Promise<LogEntity[]> {
        return await this.logService.findAll(paginationDto);
    }

    @Get(':id')
    async findOne(@Param() params: UuidParamDto): Promise<LogEntity> {
        const { id } = params;
        return await this.logService.findOne(id);
    }
}
