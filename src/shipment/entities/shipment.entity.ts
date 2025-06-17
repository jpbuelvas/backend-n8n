import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Shipper } from './shipper.entity';
import { Consignee } from './consignee.entity';
import { TransportationDetails } from './transportation-details.entity';
import { Goods } from './goods.entity';
import { SpecialHandlingInstructions } from './special-handling-instructions.entity';
import { CargoInsurance } from './cargo-insurance.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  shipmentInstructionNo: string;

  @OneToOne(() => Shipper, { cascade: true, nullable: true })
  @JoinColumn()
  shipper: Shipper;

  @OneToOne(() => Consignee, { cascade: true, nullable: true })
  @JoinColumn()
  consignee: Consignee;

  @OneToOne(() => TransportationDetails, { cascade: true, nullable: true })
  @JoinColumn()
  transportationDetails: TransportationDetails;

  @OneToOne(() => Goods, { cascade: true, nullable: true })
  @JoinColumn()
  goods: Goods;

  @OneToOne(() => SpecialHandlingInstructions, { cascade: true, nullable: true })
  @JoinColumn()
  specialHandlingInstructions: SpecialHandlingInstructions;

  @Column({ nullable: true })
  customsBroker: string;

  @OneToOne(() => CargoInsurance, { cascade: true, nullable: true })
  @JoinColumn()
  cargoInsurance: CargoInsurance;

  @Column({ nullable: true })
  temperatureControl: string;

  @Column('simple-array', { nullable: true })
  documentation: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 