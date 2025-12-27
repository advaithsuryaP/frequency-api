import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { AgentEntity } from './entities/agent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentConfigEntity } from './entities/agent-config.entity';
import { AgentQueryService } from './adapters/agent-query/agent-query.service';

@Module({
    controllers: [AgentsController],
    providers: [AgentsService, AgentQueryService],
    imports: [TypeOrmModule.forFeature([AgentEntity, AgentConfigEntity])],
    exports: [AgentQueryService]
})
export class AgentsModule {}
