import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Repository } from 'typeorm';
import { AgentEntity } from './entities/agent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class AgentsService {
    constructor(@InjectRepository(AgentEntity) private readonly agentRepository: Repository<AgentEntity>) {}

    async create(createAgentDto: CreateAgentDto): Promise<AgentEntity> {
        return await this.agentRepository.save(createAgentDto);
    }

    async findAll(paginationDto: PaginationDto): Promise<AgentEntity[]> {
        return await this.agentRepository.find({
            skip: paginationDto.skip,
            take: paginationDto.limit ?? DEFAULT_PAGE_SIZE
        });
    }

    async findOne(id: string): Promise<AgentEntity> {
        const agent = await this.agentRepository.findOne({ where: { id } });
        if (!agent) {
            throw new NotFoundException('Agent not found');
        }
        return agent;
    }

    async update(id: string, updateAgentDto: UpdateAgentDto): Promise<AgentEntity> {
        const agent = await this.findOne(id);
        if (!agent) {
            throw new NotFoundException('Agent not found');
        }
        return await this.agentRepository.save({ ...agent, ...updateAgentDto });
    }

    async remove(id: string): Promise<void> {
        const agent = await this.findOne(id);
        if (!agent) {
            throw new NotFoundException('Agent not found');
        }
        await this.agentRepository.remove(agent);
    }
}
