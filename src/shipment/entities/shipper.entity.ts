import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipper')
export class Shipper {
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