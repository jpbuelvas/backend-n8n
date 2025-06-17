import { IsString, IsObject, IsArray, ValidateNested, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ShipperDto {
  @IsString()
  @IsOptional()
  Name: string;

  @IsString()
  @IsOptional()
  Address: string;

  @IsString()
  @IsOptional()
  Contact: string;

  @IsString()
  @IsOptional()
  Phone: string;

  @IsString()
  @IsOptional()
  Email: string;
}

class ConsigneeDto {
  @IsString()
  @IsOptional()
  Name: string;

  @IsString()
  @IsOptional()
  Address: string;

  @IsString()
  @IsOptional()
  Contact: string;

  @IsString()
  @IsOptional()
  Phone: string;

  @IsString()
  @IsOptional()
  Email: string;
}

class TransportationDetailsDto {
  @IsString()
  @IsOptional()
  Mode: string;

  @IsString()
  @IsOptional()
  VesselName: string;

  @IsString()
  @IsOptional()
  IMONumber: string;

  @IsString()
  @IsOptional()
  PortOfLoading: string;

  @IsString()
  @IsOptional()
  PortOfDischarge: string;

  @IsString()
  @IsOptional()
  FinalDestination: string;

  @IsString()
  @IsOptional()
  Incoterm: string;

  @IsString()
  @IsOptional()
  EstimatedDeparture: string;

  @IsString()
  @IsOptional()
  EstimatedArrival: string;
}

class GoodsItemDto {
  @IsString()
  @IsOptional()
  Description: string;

  @IsNumber()
  @IsOptional()
  Quantity: number;

  @IsNumber()
  @IsOptional()
  Weight: number;

  @IsString()
  @IsOptional()
  Dimensions: string;
}

class GoodsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  Types: string[];

  @IsObject()
  @IsOptional()
  Packaging: {
    Electronics?: string;
    Appliances?: string;
    Furniture?: string;
    [key: string]: string | undefined;
  };

  @IsString()
  @IsOptional()
  PalletConfiguration: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoodsItemDto)
  @IsOptional()
  items: GoodsItemDto[];
}

class SpecialHandlingInstructionsDto {
  @IsObject()
  @IsOptional()
  instructions: {
    Electronics?: string;
    Appliances?: string;
    Furniture?: string;
    [key: string]: string | undefined;
  };

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  instructionList: string[];
}

class CargoInsuranceDto {
  @IsString()
  @IsOptional()
  Value: string;

  @IsString()
  @IsOptional()
  PolicyNumber: string;
}

export class CreateShipmentDto {
  @IsString()
  @IsOptional()
  ShipmentInstructionNo: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ShipperDto)
  @IsOptional()
  Shipper: ShipperDto;

  @IsObject()
  @ValidateNested()
  @Type(() => ConsigneeDto)
  @IsOptional()
  Consignee: ConsigneeDto;

  @IsObject()
  @ValidateNested()
  @Type(() => TransportationDetailsDto)
  @IsOptional()
  TransportationDetails: TransportationDetailsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => GoodsDto)
  @IsOptional()
  Goods: GoodsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GoodsItemDto)
  @IsOptional()
  GoodsItems: GoodsItemDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => SpecialHandlingInstructionsDto)
  @IsOptional()
  SpecialHandlingInstructions: SpecialHandlingInstructionsDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  SpecialHandlingInstructionsList: string[];

  @IsString()
  @IsOptional()
  CustomsBroker: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CargoInsuranceDto)
  @IsOptional()
  CargoInsurance: CargoInsuranceDto;

  @IsString()
  @IsOptional()
  TemperatureControl: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  Documentation: string[];
} 