import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicUser } from './interfaces/public-user.interface';
import { UuidParamDto } from 'src/common/dto/uuid-param.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import type { Request } from 'express';
import { RoleEnum } from '../auth/enum/role.enum';
import { Roles } from '../auth/decorators/roles.decorators';
import { RoleAuthGuard } from '../auth/guards/role-auth/role-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<PublicUser> {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto): Promise<PublicUser[]> {
        return await this.usersService.findAll(paginationDto);
    }

    @Get('profile')
    async getProfile(@Req() request: Request): Promise<PublicUser> {
        const userId: string = (request.user as PublicUser).id;
        return await this.usersService.findOne(userId);
    }

    @Get(':id')
    async findOne(@Param() params: UuidParamDto): Promise<PublicUser> {
        const { id } = params;
        return await this.usersService.findOne(id);
    }

    @Patch(':id')
    async update(@Param() params: UuidParamDto, @Body() updateUserDto: UpdateUserDto): Promise<PublicUser> {
        const { id } = params;
        return await this.usersService.update(id, updateUserDto);
    }

    @Roles(RoleEnum.ADMIN)
    @UseGuards(RoleAuthGuard)
    @Delete(':id')
    async remove(@Param() params: UuidParamDto): Promise<void> {
        const { id } = params;
        await this.usersService.remove(id);
    }

}
