import { LogEntity } from 'src/common/log/entities/log.entity';
import { RoleEnum } from 'src/modules/auth/enum/role.enum';
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

    @Column({ type: 'text', nullable: true, select: false })
    refreshToken: string | null;

    @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
    role: RoleEnum;

    @OneToMany(() => LogEntity, log => log.user, { cascade: true })
    logs: LogEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
