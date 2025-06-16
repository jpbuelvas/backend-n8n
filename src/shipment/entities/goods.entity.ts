import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  types: string[];

  @Column('json')
  packaging: {
    Electronics: string;
    Appliances: string;
    Furniture: string;
  };

  @Column()
  palletConfiguration: string;
} 