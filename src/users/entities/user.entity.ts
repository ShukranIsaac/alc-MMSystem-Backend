import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
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
import * as bcrypt from 'bcrypt';
import { UserDetail } from '../../user-details/entities/user-detail.entity';
import { Exclude } from 'class-transformer';
import { Gender } from '../../utils/enums';
import { Task } from '../../tasks/entities/task.entity';

export enum UserRoles {
  Admin = 'admin',
  Mentor = 'mentor',
  MentorManager = 'mentor-manager',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'enum', enum: Gender, default: Gender.FEMALE })
  gender: Gender;

  @Column({ nullable: true })
  dob: Date;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Mentor })
  role: UserRoles;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  reset_code: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  salt: string;

  @OneToOne(() => UserDetail, (userDetails) => userDetails.user, {
    cascade: true,
  })
  @JoinColumn()
  userDetails: UserDetail;

  @ManyToOne(() => User, (user) => user.mentors, {
    cascade: true,
    nullable: true,
  })
  manager: User;

  @OneToMany(() => User, (user) => user.manager, {
    nullable: true,
  })
  mentors: User[];

  @OneToMany(() => Task, (task) => task.assignedTo, {
    nullable: true,
  })
  tasks: Task[];

  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);

    if (!this.reset_code) {
      this.reset_code = bcrypt.hashSync(crypto.randomUUID(), 8);
    }
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    if (
      !this.password.startsWith('$2a$') &&
      !this.password.startsWith('$2b$')
    ) {
      await this.hashPassword();
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!password) return false;

    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
