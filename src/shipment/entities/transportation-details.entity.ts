import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransportationDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mode: string;

  @Column()
  vesselName: string;

  @Column()
  imoNumber: string;

  @Column()
  portOfLoading: string;

  @Column()
  portOfDischarge: string;

  @Column()
  finalDestination: string;

  @Column()
  incoterm: string;

  @Column()
  estimatedDeparture: Date;

  @Column()
  estimatedArrival: Date;
} 