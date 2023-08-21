import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AggregationService } from './aggregation.service';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateAggregationInput } from './input/create-aggregation.input';
import { AggregationFilterInput } from './input/aggregation.filter';

@ApiTags('Aggregation')
@Controller('aggregation')
export class AggregationController {
  constructor(
    private readonly aggregationService: AggregationService
  ) { }

  @ApiOperation({ summary: "Create A new Aggregation" })
  @Post('/createAggregation')
  async CreateAggregationInput(@Body(ValidationPipe) input: CreateAggregationInput) {
    return await this.aggregationService.createAggregation(input);
  }

  @ApiOperation({ summary: "Find All Aggregations" })
  @Get('/aggregationsBoard')
  async AggregationsBoard(@Body(ValidationPipe) filter: AggregationFilterInput) {
    return await this.aggregationService.AggregationsBoard(filter);
  }

}