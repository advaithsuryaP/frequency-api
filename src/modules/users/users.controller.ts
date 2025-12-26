import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { PublicUser } from './dto/public-user.interface';
import { UuidParamDto } from 'src/common/dto/uuid-param.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<PublicUser> {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<UserEntity[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param() params: UuidParamDto): Promise<UserEntity> {
        const { id } = params;
        return await this.usersService.findOne(id);
    }

    @Patch(':id')
    async update(@Param() params: UuidParamDto, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const { id } = params;
        return await this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param() params: UuidParamDto): Promise<void> {
        const { id } = params;
        await this.usersService.remove(id);
    }
}
