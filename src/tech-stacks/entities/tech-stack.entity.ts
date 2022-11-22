import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tech_stacks')
export class TechStack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
}
