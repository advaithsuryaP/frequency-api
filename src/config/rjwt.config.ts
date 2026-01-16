import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
    'rjwt',
    (): JwtSignOptions => ({
        secret: process.env.RJWT_SECRET,
        expiresIn: '7d'
    })
);
