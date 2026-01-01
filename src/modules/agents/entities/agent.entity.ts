import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AgentStatus, AgentType } from '../enums/agent.enum';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { AgentConfiguration } from '../models/agent.model';

@Entity({ name: 'agents' })
export class AgentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    slug: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    category: string;

    @Column({
        type: 'enum',
        nullable: false,
        enum: AgentStatus,
        default: AgentStatus.ACTIVE
    })
    status: AgentStatus;

    @Column({
        type: 'enum',
        enum: AgentType,
        nullable: false,
        default: AgentType.BOT
    })
    type: AgentType;

    @Column({ type: 'jsonb', nullable: false })
    configuration: AgentConfiguration;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @OneToMany(() => PostEntity, post => post.agent, { cascade: true })
    posts: PostEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
