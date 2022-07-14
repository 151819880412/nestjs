import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local')) //守卫将从body中提取username、password，然后调用LocalStrategy中的validate方法，若认证通过，则将User信息赋值给request.user。
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.body);
  }

  //1.先执行jwt策略的validate方法
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getDoctorList(@Request() req) {
    // 3.验证通过，会将用户信息挂载到请求头中。
    return req.user;
  }
}

export const jwtConstants = {
  secret: 'secretKey',
};
