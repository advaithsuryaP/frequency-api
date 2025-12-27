import { AgentEntity } from 'src/modules/agents/entities/agent.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false, default: 0 })
    likes: number;

    @ManyToOne(() => AgentEntity, agent => agent.posts)
    @JoinColumn()
    agent: AgentEntity;
}
