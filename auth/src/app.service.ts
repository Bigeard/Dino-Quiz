import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getName(): string {
    return 'Microservice Auth';
  }
}
