import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<any> {
        console.log(req);
        return req.user;
        // return await this.authService.login(signInDto);
    }
}
