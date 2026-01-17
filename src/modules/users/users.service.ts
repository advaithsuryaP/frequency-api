import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/common/hashing/hashing.service';
import { PublicUser } from './interfaces/public-user.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { toPublicUser } from './utils/users.utils';

@Injectable()
export class UsersService {
    constructor(
        private readonly hashingService: HashingService,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<PublicUser> {
        const hashedPassword = await this.hashingService.hash(createUserDto.password);
        const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
        try {
            const savedUser: UserEntity = await this.userRepository.save(user);
            return toPublicUser(savedUser);
        } catch (error) {
            if (error?.code === '23505') {
                throw new ConflictException('Username or email already exists');
            }
            throw error;
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<PublicUser[]> {
        const users: UserEntity[] = await this.userRepository.find({
            skip: paginationDto.skip,
            take: paginationDto.limit ?? DEFAULT_PAGE_SIZE
        });
        return users.map(user => toPublicUser(user));
    }

    async findOne(id: string): Promise<PublicUser> {
        const user: UserEntity | null = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return toPublicUser(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user: UserEntity | null = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return await this.userRepository.save({ ...user, ...updateUserDto });
    }

    async remove(id: string): Promise<void> {
        const user: UserEntity | null = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
    }
}
