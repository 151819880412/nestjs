import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    return { username, password };
  }

  // async validate(username: string, password: string): Promise<any> {
  //   console.log(username, password);
  //   return { username, password };
  //   // const user = await this.authService.validateUser(username, password);
  //   // if (!user) {
  //   //   // throw new UnauthorizedException();
  //   //   throw new HttpException(
  //   //     { message: '登录错误', error: '登录错误' },
  //   //     HttpStatus.BAD_REQUEST,
  //   //   );
  //   // }
  //   // return user;
  // }
}
