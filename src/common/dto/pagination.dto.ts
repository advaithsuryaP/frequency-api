import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

export class PaginationDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Min(0)
    skip: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Min(1)
    limit: number;
}
