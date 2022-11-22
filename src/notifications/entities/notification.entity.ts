import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity("notifications")
export class Notification {
    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => String, { description: `Name of the notification` })
    @Column({ type: 'varchar' })
    name: string;

    @ManyToOne((type) => User, ({ notifications }) => notifications, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    publisher: User;
}
