import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn
} from 'typeorm';
import { EventModule, LogLevel } from '../enums/log.enum';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity({ name: 'logs' })
export class LogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    message: string;

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

    @ManyToOne(() => UserEntity, user => user.logs, { nullable: true })
    @JoinColumn()
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
