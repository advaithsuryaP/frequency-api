import { RjwtAuthGuard } from './rjwt-auth.guard';

describe('RjwtAuthGuard', () => {
    it('should be defined', () => {
        expect(new RjwtAuthGuard()).toBeDefined();
    });
});
