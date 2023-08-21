import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AggregationFilterInput {
  @ApiProperty()
  @IsString()
  @IsOptional()
  searchKey?: string;
}
