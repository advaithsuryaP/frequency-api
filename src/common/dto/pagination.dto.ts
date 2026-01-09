import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginationDto {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    skip: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    limit: number;
}
