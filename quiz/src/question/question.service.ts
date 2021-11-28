import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async findAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async findAllWithParameters(
    amount_question: number,
    category: string,
    difficulty: string,
  ): Promise<Question[]> {
    let quiz = [];
    let i = 1;
    let questions = await this.questionModel.find({ category, difficulty });
    questions.forEach(question => {
      if (i === amount_question) {
        return quiz;
      } else {
        quiz.push(question);
        i++;
      }
    });
    return quiz;
  }
}
