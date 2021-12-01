import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  async signUp(@Body() user: User): Promise<string> {
    return await this.userService.signUp(user);
  }
  @Post('/signin')
  async signIn(@Body() user: User): Promise<string> {
    return await this.userService.signIn(user);
  }
}
