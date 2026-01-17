import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { SignInResponse } from './interfaces/sign-in.response';
import { PublicUser } from '../users/interfaces/public-user.interface';
import { RjwtAuthGuard } from './guards/rjwt-auth/rjwt-auth.guard';
import type { Request } from 'express';
import { RefreshTokenResponse } from './interfaces/refresh-token.response';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
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
        const userId = (request.user as PublicUser).id;
        return await this.authService.refreshToken(userId);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() request: Request): Promise<boolean> {
        const userId = (request.user as PublicUser).id;
        return await this.authService.logout(userId);
    }
}
