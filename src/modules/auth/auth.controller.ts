import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { SignInResponse } from './types/sign-in.response';
import { PublicUser } from '../users/dto/public-user.interface';
import { RjwtAuthGuard } from './guards/rjwt-auth/rjwt-auth.guard';
import { RefreshTokenResponse } from './types/refresh-token.response';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() request: Request): Promise<SignInResponse> {
        const user: PublicUser = request.user as PublicUser;
        return await this.authService.login(user);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(RjwtAuthGuard)
    @Post('refresh-token')
    async refreshToken(@Req() request: Request): Promise<RefreshTokenResponse> {
        const userId: string = (request.user as PublicUser).id;
        return this.authService.refreshToken(userId);
    }
}
