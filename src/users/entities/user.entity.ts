import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UserDetail } from '../../user-details/entities/user-detail.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

export enum UserRoles {
  Admin = 'admin',
  Mentor = 'mentor',
  MentorManger = 'mentor-manger',
}

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String)
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email: string;

  @Column({ default: false, type: 'boolean' })
  phone_verified: boolean;

  @Column({ default: false, type: 'boolean' })
  email_verified: boolean;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  country: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: true })
  github: string;

  @Column({ type: 'varchar', nullable: true })
  facebook: string;

  @Column({ type: 'varchar', nullable: true })
  twitter: string;

  @Column({ type: 'varchar', nullable: true })
  linkedin: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @Column({ type: 'varchar', nullable: true })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  headline: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Mentor })
  role: UserRoles;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  reset_code: string;

  @Column({ type: 'varchar', nullable: true })
  salt: string;

  @OneToOne((type) => UserDetail, (userDetails) => userDetails.user, {
    cascade: true,
  })
  @JoinColumn()
  userDetails: UserDetail;

  @ManyToOne((type) => User, (user) => user.mentors, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  manger: User;

  @OneToMany((type) => User, (user) => user.manger, {
    nullable: true,
  })
  @JoinColumn()
  mentors: User[];

  @OneToMany((type) => Notification, ({ publisher }) => publisher,{ nullable: true })
  notifications: Notification[];

  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
