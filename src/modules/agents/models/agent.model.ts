import { IsNotEmpty, IsString } from 'class-validator';

export class AgentConfiguration {
    @IsString()
    @IsNotEmpty()
    tone: string;

    @IsString()
    @IsNotEmpty()
    language: string;
}
