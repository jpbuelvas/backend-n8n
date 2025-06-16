import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CargoInsurance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  policyNumber: string;
} 