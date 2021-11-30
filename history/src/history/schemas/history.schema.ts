import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema()
export class History {
  @Prop()
  score: number;

  @Prop()
  user_id: Types.ObjectId;

  @Prop()
  category: string;

  @Prop()
  difficulty: string;

  @Prop()
  amount_question: number;
}

export const HistorySchema = SchemaFactory.createForClass(History);
