import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = plainToClass(Shipment, {
      shipmentInstructionNo: createShipmentDto.ShipmentInstructionNo,
      shipper: {
        name: createShipmentDto.Shipper.Name,
        address: createShipmentDto.Shipper.Address,
        contact: createShipmentDto.Shipper.Contact,
        phone: createShipmentDto.Shipper.Phone,
        email: createShipmentDto.Shipper.Email,
      },
      consignee: {
        name: createShipmentDto.Consignee.Name,
        address: createShipmentDto.Consignee.Address,
        contact: createShipmentDto.Consignee.Contact,
        phone: createShipmentDto.Consignee.Phone,
        email: createShipmentDto.Consignee.Email,
      },
      transportationDetails: {
        mode: createShipmentDto.TransportationDetails.Mode,
        vesselName: createShipmentDto.TransportationDetails.VesselName,
        imoNumber: createShipmentDto.TransportationDetails.IMONumber,
        portOfLoading: createShipmentDto.TransportationDetails.PortOfLoading,
        portOfDischarge: createShipmentDto.TransportationDetails.PortOfDischarge,
        finalDestination: createShipmentDto.TransportationDetails.FinalDestination,
        incoterm: createShipmentDto.TransportationDetails.Incoterm,
        estimatedDeparture: new Date(createShipmentDto.TransportationDetails.EstimatedDeparture),
        estimatedArrival: new Date(createShipmentDto.TransportationDetails.EstimatedArrival),
      },
      goods: {
        types: createShipmentDto.Goods.Types,
        packaging: createShipmentDto.Goods.Packaging,
        palletConfiguration: createShipmentDto.Goods.PalletConfiguration,
      },
      specialHandlingInstructions: {
        electronics: createShipmentDto.SpecialHandlingInstructions.Electronics,
        appliances: createShipmentDto.SpecialHandlingInstructions.Appliances,
        furniture: createShipmentDto.SpecialHandlingInstructions.Furniture,
      },
      customsBroker: createShipmentDto.CustomsBroker,
      cargoInsurance: {
        value: createShipmentDto.CargoInsurance.Value,
        policyNumber: createShipmentDto.CargoInsurance.PolicyNumber,
      },
      temperatureControl: createShipmentDto.TemperatureControl,
      documentation: createShipmentDto.Documentation,
    });

    return await this.shipmentRepository.save(shipment);
  }

  async findAll(): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      relations: [
        'shipper',
        'consignee',
        'transportationDetails',
        'goods',
        'specialHandlingInstructions',
        'cargoInsurance',
      ],
    });
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: [
        'shipper',
        'consignee',
        'transportationDetails',
        'goods',
        'specialHandlingInstructions',
        'cargoInsurance',
      ],
    });

    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }

    return shipment;
  }
} 