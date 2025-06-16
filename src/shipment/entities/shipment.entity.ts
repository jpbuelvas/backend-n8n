import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Shipper } from './shipper.entity';
import { Consignee } from './consignee.entity';
import { TransportationDetails } from './transportation-details.entity';
import { SpecialHandlingInstructions } from './special-handling-instructions.entity';
import { Goods } from './goods.entity';
import { CargoInsurance } from './cargo-insurance.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shipmentInstructionNo: string;

  @OneToOne(() => Shipper, { cascade: true })
  @JoinColumn()
  shipper: Shipper;

  @OneToOne(() => Consignee, { cascade: true })
  @JoinColumn()
  consignee: Consignee;

  @OneToOne(() => TransportationDetails, { cascade: true })
  @JoinColumn()
  transportationDetails: TransportationDetails;

  @OneToOne(() => Goods, { cascade: true })
  @JoinColumn()
  goods: Goods;

  @OneToOne(() => SpecialHandlingInstructions, { cascade: true })
  @JoinColumn()
  specialHandlingInstructions: SpecialHandlingInstructions;

  @Column()
  customsBroker: string;

  @OneToOne(() => CargoInsurance, { cascade: true })
  @JoinColumn()
  cargoInsurance: CargoInsurance;

  @Column({ nullable: true })
  temperatureControl: string;

  @Column('simple-array')
  documentation: string[];
} 