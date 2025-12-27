import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AgentStatus, AgentType } from '../enums/agent.enum';
import { AgentConfiguration } from '../models/agent.model';
import { Type } from 'class-transformer';

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

    @ValidateNested()
    @Type(() => AgentConfiguration)
    @IsNotEmpty()
    configuration: AgentConfiguration;
}
