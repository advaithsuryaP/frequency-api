import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { AgentStatus, AgentType } from '../enums/agent.enum';
import { AgentConfigEntity } from './agent-config.entity';
import { PostEntity } from 'src/modules/posts/entities/post.entity';

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

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => AgentConfigEntity, agentConfiguration => agentConfiguration.agent, { cascade: true })
    agentConfiguration: AgentConfigEntity;

    @OneToMany(() => PostEntity, post => post.agent, { cascade: true })
    posts: PostEntity[];
}
