import { Column } from 'typeorm';

export class AgentConfigEntity {
    @Column({ nullable: false })
    schedule: string;

    @Column({ nullable: false })
    tone: string;

    @Column({ nullable: false })
    language: string;
}
