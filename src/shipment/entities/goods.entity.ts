import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: true })
  types: string[];

  @Column('jsonb', { nullable: true })
  packaging: {
    Electronics?: string;
    Appliances?: string;
    Furniture?: string;
    [key: string]: string | undefined;
  };

  @Column({ nullable: true })
  palletConfiguration: string;

  @Column('jsonb', { nullable: true })
  items: Array<{
    Description: string;
    Quantity: number;
    Weight: number;
    Dimensions: string;
    [key: string]: any;
  }>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 