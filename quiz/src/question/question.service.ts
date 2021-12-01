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
    let questions = await this.questionModel.find();
    return questions;
  }

  async findAllWithParameters(
    amount_question: number,
    category: string,
    difficulty: string,
  ): Promise<Question[]> {
    let quiz = [];
    let questions;
    let findParams = {};
    if (category !== 'any' && difficulty !== 'any') {
      if (!category || category === 'any') {
        findParams = { difficulty };
      } else if (!difficulty || difficulty === 'any') {
        findParams = { category };
      } else {
        findParams = { category, difficulty };
      }
    }
    questions = await this.questionModel.find(findParams);
    if (questions.length < amount_question) {
      quiz = questions;
    } else {
      quiz = questions.slice(0, amount_question);
    }
    return quiz;
  }
}
