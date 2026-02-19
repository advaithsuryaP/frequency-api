import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { UserQueryService } from '../users/adapters/user-query/user-query.service';

@Injectable()
export class PostsService {
    constructor(
        private readonly userQueryService: UserQueryService,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ) {}

    async create(userId: string, createPostDto: CreatePostDto): Promise<PostEntity> {
        const { content } = createPostDto;

        const user = await this.userQueryService.findUserById(userId);
        if (!user) throw new NotFoundException('User not found');

        const post = this.postRepository.create({ content, user });
        return await this.postRepository.save(post);
    }

    async findAll(paginationDto: PaginationDto): Promise<PostEntity[]> {
        return await this.postRepository.find({
            skip: paginationDto.skip,
            take: paginationDto.limit ?? DEFAULT_PAGE_SIZE
        });
    }

    async findOne(id: string): Promise<PostEntity> {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
        const post = await this.findOne(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return await this.postRepository.save({ ...post, ...updatePostDto });
    }

    async remove(id: string): Promise<void> {
        const post = await this.findOne(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        await this.postRepository.remove(post);
    }
}
