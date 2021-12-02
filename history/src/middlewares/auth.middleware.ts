import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

function verify(token: string, key: string, options: Object): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, options, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      try {
        let test = await verify(req.token, process.env.JWT_SECRET, {});
        if (test) {
          next();
        }
      } catch (err) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
