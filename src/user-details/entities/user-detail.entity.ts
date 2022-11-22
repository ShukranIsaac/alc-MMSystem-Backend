import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Programme } from '../../programmes/entities/programme.entity';

@Entity('user_details')
export class UserDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  job_roles: string[];

  @Column('text')
  previous_programs: string[];

  @Column('text')
  tech_stacks: string[];

  @Column({ default: false })
  status?: boolean;

  @Column({ default: false })
  approved?: boolean;

  @Column({ default: false })
  been_mentor?: boolean;

  @Column({ default: false })
  years_of_experience?: boolean;

  @ManyToOne(() => Programme, {
    cascade: true,
  })
  @JoinColumn()
  programme: Programme;

  @OneToOne(() => User, (user) => user.userDetails, {})
  @JoinColumn()
  user: User;
}
