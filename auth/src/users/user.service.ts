import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

function sign(payload: Object, key: string, options: Object): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, options, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUp({ username, password }: User): Promise<User> {
    let hash = await bcrypt.hash(password, 12);
    const createdUser = new this.userModel({ username, password: hash });
    const userExists = await this.userModel.exists({ username });
    if (userExists) {
      throw new Error('This account already exist');
    } else {
      let user = await createdUser.save();
      return user;
    }
  }

  async signIn({ username, password }: User): Promise<string> {
    let user = await this.userModel.findOne({ username });
    if (user) {
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        let token = await sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
        return token;
      } else {
        throw new Error('Password is not valid');
      }
    } else {
      throw new Error("This account doesn't exist");
    }
  }
}
