import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// export class JwtStrategy extends PassportStrategy(Strategy) {
//     // constructor(configService: ConfigService) {
//     //     super({
//     //         ignoreExpiration: false,
//     //         secretOrKey: configService.get<string>('JWT_SECRET') ?? '',
//     //         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//     //     });
//     // }
// }
