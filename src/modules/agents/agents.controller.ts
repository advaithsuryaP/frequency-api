import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { UuidParamDto } from 'src/common/dto/uuid-param.dto';
import { AgentEntity } from './entities/agent.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('agents')
export class AgentsController {
    constructor(private readonly agentsService: AgentsService) { }

    @Post()
    async create(@Body() createAgentDto: CreateAgentDto): Promise<AgentEntity> {
        return await this.agentsService.create(createAgentDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto): Promise<AgentEntity[]> {
        return await this.agentsService.findAll(paginationDto);
    }

    @Get(':id')
    async findOne(@Param() params: UuidParamDto): Promise<AgentEntity> {
        const { id } = params;
        return await this.agentsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param() params: UuidParamDto, @Body() updateAgentDto: UpdateAgentDto): Promise<AgentEntity> {
        const { id } = params;
        return await this.agentsService.update(id, updateAgentDto);
    }

    @Delete(':id')
    async remove(@Param() params: UuidParamDto): Promise<void> {
        const { id } = params;
        await this.agentsService.remove(id);
    }
}
