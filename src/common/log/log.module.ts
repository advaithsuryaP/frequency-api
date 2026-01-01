import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './entities/log.entity';
import { LogEventService } from './adapters/log-event/log-event.service';

@Module({
    controllers: [LogController],
    providers: [LogService, LogEventService],
    exports: [LogEventService],
    imports: [TypeOrmModule.forFeature([LogEntity])]
})
export class LogModule {}
