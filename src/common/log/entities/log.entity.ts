import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EventModule, LogLevel } from '../enums/log.enum';

@Entity({ name: 'logs' })
export class LogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    message: string;

    @Column({ nullable: true })
    userId: string;

    @Column({
        type: 'enum',
        enum: LogLevel,
        nullable: false,
        default: LogLevel.INFO
    })
    level: LogLevel;

    @Column({
        type: 'enum',
        nullable: false,
        enum: EventModule,
        default: EventModule.EXTERNAL
    })
    module: EventModule;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
