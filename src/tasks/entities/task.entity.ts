import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Programme } from '../../programmes/entities/programme.entity';

export enum TaskStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  UNASSIGNED = 'unassigned',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.UNASSIGNED })
  status: TaskStatus;

  @ManyToOne(() => Programme, { cascade: true })
  programme: Programme;

  @ManyToOne(() => User)
  created_by: User;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, { nullable: true })
  assigned_to: User;

  @ManyToOne(() => User, { nullable: true })
  assigned_by: User;

  @Column({ type: 'datetime', nullable: true })
  assigned_at: Date;

  @ManyToOne(() => User)
  last_updated_by: User;

  @Column()
  @UpdateDateColumn()
  last_updated_at: Date;

  @ManyToOne(() => User, { nullable: true })
  deleted_by: User;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;
}
