import { IsNotEmpty, IsUUID } from 'class-validator';

export class UuidParamDto {
    @IsUUID('4')
    @IsNotEmpty()
    readonly id: string;
}
