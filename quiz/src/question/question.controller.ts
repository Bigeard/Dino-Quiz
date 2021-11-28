import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './schemas/question.schema';

@Controller('api/v1/quiz')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/all')
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get('')
  async findAllwithParameters(
    @Query('amount_question') amount_question: number,
    @Query('category') category: string,
    @Query('difficulty') difficulty: string,
  ): Promise<Question[]> {
    return this.questionService.findAllWithParameters(
      amount_question,
      category,
      difficulty,
    );
  }
}
