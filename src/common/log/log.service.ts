import { Injectable, NotFoundException } from '@nestjs/common';
import { LogEntity } from './entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogService {
    constructor(@InjectRepository(LogEntity) private readonly logRepository: Repository<LogEntity>) {}

    async create(createLogDto: CreateLogDto): Promise<LogEntity> {
        return await this.logRepository.save(createLogDto);
    }

    async findAll(): Promise<LogEntity[]> {
        return await this.logRepository.find();
    }

    async findOne(id: string): Promise<LogEntity> {
        const log = await this.logRepository.findOne({ where: { id } });
        if (!log) {
            throw new NotFoundException('Log not found');
        }
        return log;
    }
}
