import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as aargon from 'argon2';

@Injectable()
export class HashingService {
    private readonly _saltRounds: number = 10;

    async hashWithBcrypt(data: string): Promise<string> {
        return await bcrypt.hash(data, this._saltRounds);
    }

    async hashWithAargon(data: string): Promise<string> {
        return await aargon.hash(data);
    }

    async compare(data: string, hashedData: string): Promise<boolean> {
        return await bcrypt.compare(data, hashedData);
    }
}
