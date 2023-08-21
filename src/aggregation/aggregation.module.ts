import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Aggregation, AggregationSchema } from './model/aggregation.model';
import { AggregationController } from './aggregation.controller';
import { AggregationService } from './aggregation.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Aggregation.name, schema: AggregationSchema }]),
    ],
    controllers: [AggregationController],
    providers: [AggregationService],
    exports: [AggregationService]
})
export class AggregationModule { }