import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Headers,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { History } from './schemas/history.schema';
import * as jwt from 'jsonwebtoken';

@Controller('api/v1/history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/me')
  async findAllHistoriesByUserId(@Headers() headers): Promise<History[]> {
    let token = headers.authorization.split(' ')[1];
    let req = jwt.verify(token, process.env.JWT_SECRET);
    return await this.historyService.findAllHistoriesByUserId(req.id);
  }

  @Get(':id')
  async findOne(@Param() params): Promise<History> {
    return await this.historyService.findOne(params.id);
  }

  @Post('')
  async createHistory(
    @Body() history: History,
    @Headers() headers,
  ): Promise<History> {
    let token = headers.authorization.split(' ')[1];
    let req = jwt.verify(token, process.env.JWT_SECRET);
    let createHistory = await this.historyService.createHistory(
      history,
      req.id,
    );
    return createHistory;
  }
}
