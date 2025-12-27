import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { AgentEntity } from './entities/agent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentConfigEntity } from './entities/agent-config.entity';

@Module({
    controllers: [AgentsController],
    providers: [AgentsService],
    imports: [TypeOrmModule.forFeature([AgentEntity, AgentConfigEntity])]
})
export class AgentsModule {}
