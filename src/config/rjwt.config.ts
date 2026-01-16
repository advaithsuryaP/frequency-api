import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
    'rjwt',
    (): JwtSignOptions => ({
        secret: process.env.RJWT_SECRET,
        expiresIn: Number(process.env.RJWT_EXPIRES_IN) ?? '7d'
    })
);
