import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consignee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  phone: string;

  @Column()
  email: string;
} 