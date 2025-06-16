import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecialHandlingInstructions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  electronics: string;

  @Column()
  appliances: string;

  @Column()
  furniture: string;
} 