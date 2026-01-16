import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class RjwtAuthGuard extends AuthGuard('rjwt') {}
