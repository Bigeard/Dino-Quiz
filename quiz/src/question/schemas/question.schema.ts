import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  category: string;

  @Prop()
  difficulty: string;

  @Prop()
  text_question: string;

  @Prop()
  correct_answer: string;

  @Prop()
  incorrect_answers: Array<string>;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
