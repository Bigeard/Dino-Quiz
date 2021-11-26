import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './schemas/question.schema';

@Controller('quiz')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/all')
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }
}
