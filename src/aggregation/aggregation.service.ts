import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Aggregation, AggregationDocument } from './model/aggregation.model';
import { Model } from 'mongoose';
import { CreateAggregationInput } from './input/create-aggregation.input';
import { AggregationFilterInput } from './input/aggregation.filter';

@Injectable()
export class AggregationService {
  constructor(
    @InjectModel(Aggregation.name) private aggregationModel: Model<AggregationDocument>,
  ) { }

  async createAggregation(input: CreateAggregationInput): Promise<Aggregation> {
    return await new this.aggregationModel({ ...input }).save();
  }

  async AggregationsBoard(input: AggregationFilterInput = {}): Promise<Aggregation[]> {
    const aggregations = await this.aggregationModel.aggregate([{ ...(input.searchKey && { $match: { enTitle: input.searchKey } }) }]);
    console.log('>>>>>>>>>>>>', aggregations);
    return aggregations;
  }
}