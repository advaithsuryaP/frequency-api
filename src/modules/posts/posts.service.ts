import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgentQueryService } from '../agents/adapters/agent-query/agent-query.service';

@Injectable()
export class PostsService {
    constructor(
        private readonly agentQueryService: AgentQueryService,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
    ) {}

    async create(createPostDto: CreatePostDto): Promise<PostEntity> {
        const { agentId, title, content } = createPostDto;
        const agent = await this.agentQueryService.findAgentById(agentId);

        if (!agent) throw new NotFoundException('Agent not found');

        const post = this.postRepository.create({ title, content, agent });
        return await this.postRepository.save(post);
    }

    async findAll(): Promise<PostEntity[]> {
        return await this.postRepository.find();
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
