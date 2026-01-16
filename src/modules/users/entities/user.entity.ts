import { LogEntity } from 'src/common/log/entities/log.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Column()
    displayName: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    refreshToken: string | null;

    @OneToMany(() => LogEntity, log => log.user, { cascade: true })
    logs: LogEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
