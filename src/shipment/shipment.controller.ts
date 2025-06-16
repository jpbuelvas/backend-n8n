import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { Shipment } from './entities/shipment.entity';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Controller('shipments')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    return this.shipmentService.create(createShipmentDto);
  }

  @Get()
  findAll(): Promise<Shipment[]> {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Shipment> {
    return this.shipmentService.findOne(id);
  }
} 