import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UuidParamDto } from 'src/common/dto/uuid-param.dto';
import { PostEntity } from './entities/post.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PublicUser } from '../users/interfaces/public-user.interface';
import type { Request } from 'express';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    async create(@Body() createPostDto: CreatePostDto, @Req() request: Request): Promise<PostEntity> {
        const userId: string = (request.user as PublicUser).id;
        return await this.postsService.create(userId, createPostDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto): Promise<PostEntity[]> {
        return await this.postsService.findAll(paginationDto);
    }

    @Get(':id')
    async findOne(@Param() params: UuidParamDto): Promise<PostEntity> {
        const { id } = params;
        return await this.postsService.findOne(id);
    }

    @Patch(':id')
    async update(@Param() params: UuidParamDto, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
        const { id } = params;
        return await this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    async remove(@Param() params: UuidParamDto): Promise<void> {
        const { id } = params;
        await this.postsService.remove(id);
    }
}
