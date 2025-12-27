import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AgentEntity } from './agent.entity';

@Entity({ name: 'agent_configs' })
export class AgentConfigEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    schedule: string;

    @Column({ nullable: false })
    tone: string;

    @Column({ nullable: false })
    language: string;

    @OneToOne(() => AgentEntity, agent => agent.agentConfiguration)
    @JoinColumn()
    agent: AgentEntity;
}
