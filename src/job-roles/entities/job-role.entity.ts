import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job_roles')
export class JobRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
}
