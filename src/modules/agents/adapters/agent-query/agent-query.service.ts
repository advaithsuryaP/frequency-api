import { Injectable } from '@nestjs/common';
import { AgentEntity } from '../../entities/agent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AgentQueryService {
    constructor(@InjectRepository(AgentEntity) private readonly agentRepository: Repository<AgentEntity>) {}

    async findAgentById(id: string): Promise<AgentEntity | null> {
        const agent = await this.agentRepository.findOne({ where: { id } });
        if (!agent) return null;
        return agent;
    }
}
