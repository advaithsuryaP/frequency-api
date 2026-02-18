import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    content: string;

    @Column({ nullable: false, default: 0 })
    likes: number;

    @ManyToOne(() => UserEntity, user => user, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
