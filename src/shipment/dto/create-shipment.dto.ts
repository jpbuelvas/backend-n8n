import { IsString, IsObject, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ShipperDto {
  @IsString()
  Name: string;

  @IsString()
  Address: string;

  @IsString()
  Contact: string;

  @IsString()
  Phone: string;

  @IsString()
  Email: string;
}

class ConsigneeDto {
  @IsString()
  Name: string;

  @IsString()
  Address: string;

  @IsString()
  Contact: string;

  @IsString()
  Phone: string;

  @IsString()
  Email: string;
}

class TransportationDetailsDto {
  @IsString()
  Mode: string;

  @IsString()
  VesselName: string;

  @IsString()
  IMONumber: string;

  @IsString()
  PortOfLoading: string;

  @IsString()
  PortOfDischarge: string;

  @IsString()
  FinalDestination: string;

  @IsString()
  Incoterm: string;

  @IsString()
  EstimatedDeparture: string;

  @IsString()
  EstimatedArrival: string;
}

class GoodsDto {
  @IsArray()
  @IsString({ each: true })
  Types: string[];

  @IsObject()
  Packaging: {
    Electronics: string;
    Appliances: string;
    Furniture: string;
  };

  @IsString()
  PalletConfiguration: string;
}

class SpecialHandlingInstructionsDto {
  @IsString()
  Electronics: string;

  @IsString()
  Appliances: string;

  @IsString()
  Furniture: string;
}

class CargoInsuranceDto {
  @IsString()
  Value: string;

  @IsString()
  PolicyNumber: string;
}

export class CreateShipmentDto {
  @IsString()
  ShipmentInstructionNo: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ShipperDto)
  Shipper: ShipperDto;

  @IsObject()
  @ValidateNested()
  @Type(() => ConsigneeDto)
  Consignee: ConsigneeDto;

  @IsObject()
  @ValidateNested()
  @Type(() => TransportationDetailsDto)
  TransportationDetails: TransportationDetailsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GoodsDto)
  Goods: GoodsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SpecialHandlingInstructionsDto)
  SpecialHandlingInstructions: SpecialHandlingInstructionsDto;

  @IsString()
  CustomsBroker: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CargoInsuranceDto)
  CargoInsurance: CargoInsuranceDto;

  @IsString()
  @IsOptional()
  TemperatureControl?: string;

  @IsArray()
  @IsString({ each: true })
  Documentation: string[];
} 