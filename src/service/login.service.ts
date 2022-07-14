import { Injectable } from '@nestjs/common';
import { LoginDto } from '../pojo/dto/login.dto';

export interface LoginService {
  login(loginVO: LoginDto): number;
}

// @Injectable()
// export class LoginService {
//   login(loginDto: LoginDto): number {
//     console.log(loginDto);
//     console.log(this);
//     return 111;
//   }
// }
