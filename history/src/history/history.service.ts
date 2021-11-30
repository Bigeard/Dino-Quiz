import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { History, HistoryDocument } from './schemas/history.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class HistoryService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {}

  async findAllHistoriesByUserId(user_id: Types.ObjectId): Promise<History[]> {
    return await this.historyModel.find({ user_id });
  }

  async findOne(history_id: Types.ObjectId): Promise<History> {
    return await this.historyModel.findOne({ _id: history_id });
  }

  async createHistory(
    { score, difficulty, category, amount_question }: History,
    user_id: Types.ObjectId,
  ): Promise<History> {
    const createHistory = new this.historyModel({
      score,
      user_id,
      category,
      difficulty,
      amount_question,
    });
    let history = await createHistory.save();
    return history;
  }
}
