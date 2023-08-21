import {
  IsNotEmpty,
  IsString,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAggregationInput {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  enTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  arTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  enDescription: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  arDescription: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
