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

  private parseDate(dateStr: string): Date | null {
    if (!dateStr || dateStr.trim() === '') {
      return null;
    }
    try {
      return new Date(dateStr);
    } catch {
      return null;
    }
  }

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = plainToClass(Shipment, {
      shipmentInstructionNo: createShipmentDto.ShipmentInstructionNo,
      shipper: {
        name: createShipmentDto.Shipper?.Name || '',
        address: createShipmentDto.Shipper?.Address || '',
        contact: createShipmentDto.Shipper?.Contact || '',
        phone: createShipmentDto.Shipper?.Phone || '',
        email: createShipmentDto.Shipper?.Email || '',
      },
      consignee: {
        name: createShipmentDto.Consignee?.Name || '',
        address: createShipmentDto.Consignee?.Address || '',
        contact: createShipmentDto.Consignee?.Contact || '',
        phone: createShipmentDto.Consignee?.Phone || '',
        email: createShipmentDto.Consignee?.Email || '',
      },
      transportationDetails: {
        mode: createShipmentDto.TransportationDetails?.Mode || '',
        vesselName: createShipmentDto.TransportationDetails?.VesselName || '',
        imoNumber: createShipmentDto.TransportationDetails?.IMONumber || '',
        portOfLoading: createShipmentDto.TransportationDetails?.PortOfLoading || '',
        portOfDischarge: createShipmentDto.TransportationDetails?.PortOfDischarge || '',
        finalDestination: createShipmentDto.TransportationDetails?.FinalDestination || '',
        incoterm: createShipmentDto.TransportationDetails?.Incoterm || '',
        estimatedDeparture: this.parseDate(createShipmentDto.TransportationDetails?.EstimatedDeparture) || new Date(),
        estimatedArrival: this.parseDate(createShipmentDto.TransportationDetails?.EstimatedArrival) || new Date(),
      },
      goods: {
        types: createShipmentDto.Goods?.Types || [],
        packaging: createShipmentDto.Goods?.Packaging || {},
        palletConfiguration: createShipmentDto.Goods?.PalletConfiguration || '',
        items: createShipmentDto.Goods?.items || createShipmentDto.GoodsItems?.map(item => ({
          description: item.Description || '',
          quantity: item.Quantity || 0,
          weight: item.Weight || 0,
          dimensions: item.Dimensions || ''
        })) || []
      },
      specialHandlingInstructions: {
        instructions: {
          Electronics: createShipmentDto.SpecialHandlingInstructions?.instructions?.Electronics || '',
          Appliances: createShipmentDto.SpecialHandlingInstructions?.instructions?.Appliances || '',
          Furniture: createShipmentDto.SpecialHandlingInstructions?.instructions?.Furniture || '',
        },
        instructionList: createShipmentDto.SpecialHandlingInstructions?.instructionList || 
                        createShipmentDto.SpecialHandlingInstructionsList || []
      },
      customsBroker: createShipmentDto.CustomsBroker || '',
      cargoInsurance: {
        value: createShipmentDto.CargoInsurance?.Value || '',
        policyNumber: createShipmentDto.CargoInsurance?.PolicyNumber || '',
      },
      temperatureControl: createShipmentDto.TemperatureControl || '',
      documentation: createShipmentDto.Documentation || [],
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

  async update(id: string, updateShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = await this.findOne(id);

    const updatedShipment = plainToClass(Shipment, {
      ...shipment,
      shipmentInstructionNo: updateShipmentDto.ShipmentInstructionNo || shipment.shipmentInstructionNo,
      shipper: {
        name: updateShipmentDto.Shipper?.Name || shipment.shipper.name,
        address: updateShipmentDto.Shipper?.Address || shipment.shipper.address,
        contact: updateShipmentDto.Shipper?.Contact || shipment.shipper.contact,
        phone: updateShipmentDto.Shipper?.Phone || shipment.shipper.phone,
        email: updateShipmentDto.Shipper?.Email || shipment.shipper.email,
      },
      consignee: {
        name: updateShipmentDto.Consignee?.Name || shipment.consignee.name,
        address: updateShipmentDto.Consignee?.Address || shipment.consignee.address,
        contact: updateShipmentDto.Consignee?.Contact || shipment.consignee.contact,
        phone: updateShipmentDto.Consignee?.Phone || shipment.consignee.phone,
        email: updateShipmentDto.Consignee?.Email || shipment.consignee.email,
      },
      transportationDetails: {
        mode: updateShipmentDto.TransportationDetails?.Mode || shipment.transportationDetails.mode,
        vesselName: updateShipmentDto.TransportationDetails?.VesselName || shipment.transportationDetails.vesselName,
        imoNumber: updateShipmentDto.TransportationDetails?.IMONumber || shipment.transportationDetails.imoNumber,
        portOfLoading: updateShipmentDto.TransportationDetails?.PortOfLoading || shipment.transportationDetails.portOfLoading,
        portOfDischarge: updateShipmentDto.TransportationDetails?.PortOfDischarge || shipment.transportationDetails.portOfDischarge,
        finalDestination: updateShipmentDto.TransportationDetails?.FinalDestination || shipment.transportationDetails.finalDestination,
        incoterm: updateShipmentDto.TransportationDetails?.Incoterm || shipment.transportationDetails.incoterm,
        estimatedDeparture: this.parseDate(updateShipmentDto.TransportationDetails?.EstimatedDeparture) || shipment.transportationDetails.estimatedDeparture,
        estimatedArrival: this.parseDate(updateShipmentDto.TransportationDetails?.EstimatedArrival) || shipment.transportationDetails.estimatedArrival,
      },
      goods: {
        types: updateShipmentDto.Goods?.Types || shipment.goods.types,
        packaging: updateShipmentDto.Goods?.Packaging || shipment.goods.packaging,
        palletConfiguration: updateShipmentDto.Goods?.PalletConfiguration || shipment.goods.palletConfiguration,
        items: updateShipmentDto.Goods?.items || updateShipmentDto.GoodsItems?.map(item => ({
          description: item.Description || '',
          quantity: item.Quantity || 0,
          weight: item.Weight || 0,
          dimensions: item.Dimensions || ''
        })) || shipment.goods.items
      },
      specialHandlingInstructions: {
        instructions: {
          Electronics: updateShipmentDto.SpecialHandlingInstructions?.instructions?.Electronics || 
                      shipment.specialHandlingInstructions.instructions?.Electronics || '',
          Appliances: updateShipmentDto.SpecialHandlingInstructions?.instructions?.Appliances || 
                     shipment.specialHandlingInstructions.instructions?.Appliances || '',
          Furniture: updateShipmentDto.SpecialHandlingInstructions?.instructions?.Furniture || 
                    shipment.specialHandlingInstructions.instructions?.Furniture || '',
        },
        instructionList: updateShipmentDto.SpecialHandlingInstructions?.instructionList || 
                        updateShipmentDto.SpecialHandlingInstructionsList || 
                        shipment.specialHandlingInstructions.instructionList
      },
      customsBroker: updateShipmentDto.CustomsBroker || shipment.customsBroker,
      cargoInsurance: {
        value: updateShipmentDto.CargoInsurance?.Value || shipment.cargoInsurance.value,
        policyNumber: updateShipmentDto.CargoInsurance?.PolicyNumber || shipment.cargoInsurance.policyNumber,
      },
      temperatureControl: updateShipmentDto.TemperatureControl || shipment.temperatureControl,
      documentation: updateShipmentDto.Documentation || shipment.documentation,
    });

    return await this.shipmentRepository.save(updatedShipment);
  }

  async remove(id: string): Promise<void> {
    const shipment = await this.findOne(id);
    await this.shipmentRepository.remove(shipment);
  }
} 