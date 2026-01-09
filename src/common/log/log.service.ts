import { Injectable, NotFoundException } from '@nestjs/common';
import { LogEntity } from './entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { UserQueryService } from 'src/modules/users/adapters/user-query/user-query.service';
import { PaginationDto } from '../dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class LogService {
    constructor(
        private readonly userQueryService: UserQueryService,
        @InjectRepository(LogEntity) private readonly logRepository: Repository<LogEntity>
    ) {}

    async create(createLogDto: CreateLogDto): Promise<LogEntity> {
        const { userId, ...log } = createLogDto;
        const user = await this.userQueryService.findUserById(userId);

        if (!user) throw new NotFoundException('User not found');

        const newLog = this.logRepository.create({ ...log, user });
        return await this.logRepository.save(newLog);
    }

    async findAll(paginationDto: PaginationDto): Promise<LogEntity[]> {
        return await this.logRepository.find({
            skip: paginationDto.skip,
            take: paginationDto.limit ?? DEFAULT_PAGE_SIZE
        });
    }

    async findOne(id: string): Promise<LogEntity> {
        const log = await this.logRepository.findOne({ where: { id } });
        if (!log) {
            throw new NotFoundException('Log not found');
        }
        return log;
    }
}
