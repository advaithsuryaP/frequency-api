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
            const savedUser = await this.userRepository.save(user);
            const { password, ...publicUser } = savedUser;
            return publicUser;
        } catch (error) {
            if (error?.code === '23505') {
                throw new ConflictException('Username or email already exists');
            }
            throw error;
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<UserEntity[]> {
        return await this.userRepository.find({
            skip: paginationDto.skip,
            take: paginationDto.limit ?? DEFAULT_PAGE_SIZE
        });
    }

    async findOne(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return await this.userRepository.save({ ...user, ...updateUserDto });
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
    }
}
