import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    content: string;
}
