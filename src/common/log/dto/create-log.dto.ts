import { IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { EventModule, LogLevel } from '../enums/log.enum';

export class CreateLogDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    message: string;

    @IsUUID('4')
    userId: string;

    @IsEnum(LogLevel)
    @IsNotEmpty()
    level: LogLevel;

    @IsEnum(EventModule)
    @IsNotEmpty()
    module: EventModule;
}
