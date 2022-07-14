import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/pojo/dto/login.dto';
import { LoginService } from '../login.service';

@Injectable()
export class loginServiceImpl implements LoginService {
  login(loginDto: LoginDto): number {
    console.log(loginDto);
    return 1;
  }
}
