import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecialHandlingInstructions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: true })
  instructions: {
    Electronics?: string;
    Appliances?: string;
    Furniture?: string;
    [key: string]: string | undefined;
  };

  @Column('jsonb', { nullable: true })
  instructionList: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 