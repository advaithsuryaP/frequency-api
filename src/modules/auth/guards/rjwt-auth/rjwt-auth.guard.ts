import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RjwtAuthGuard extends AuthGuard('rjwt') {}
