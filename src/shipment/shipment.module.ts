import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { Shipment } from './entities/shipment.entity';
import { Shipper } from './entities/shipper.entity';
import { Consignee } from './entities/consignee.entity';
import { TransportationDetails } from './entities/transportation-details.entity';
import { Goods } from './entities/goods.entity';
import { SpecialHandlingInstructions } from './entities/special-handling-instructions.entity';
import { CargoInsurance } from './entities/cargo-insurance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Shipment,
      Shipper,
      Consignee,
      TransportationDetails,
      Goods,
      SpecialHandlingInstructions,
      CargoInsurance,
    ]),
  ],
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentModule {} 