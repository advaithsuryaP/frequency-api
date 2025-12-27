import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AgentStatus, AgentType } from '../models/agent.model';

export class CreateAgentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsEnum(AgentStatus)
    @IsOptional()
    status: AgentStatus;

    @IsEnum(AgentType)
    @IsNotEmpty()
    type: AgentType;
}
