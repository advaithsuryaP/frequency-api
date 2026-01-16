import { Injectable } from '@nestjs/common';
import * as aargon from 'argon2';

@Injectable()
export class HashingService {
    async hash(data: string): Promise<string> {
        return await aargon.hash(data);
    }

    async verify(data: string, hashedData: string): Promise<boolean> {
        return await aargon.verify(hashedData, data);
    }
}
