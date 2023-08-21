import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type AggregationDocument = HydratedDocument<Aggregation>;

@Schema()
export class Aggregation {
  @Prop({ type: String, required: true })
  enTitle: string;

  @Prop({ type: String, required: true })
  arTitle: string;

  @Prop({ type: String, required: true })
  enDescription: string;

  @Prop({ type: String, required: true })
  arDescription: string;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;
}

export const AggregationSchema = SchemaFactory.createForClass(Aggregation);