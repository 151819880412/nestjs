import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from 'src/controller/login.controller';
import { Login } from 'src/pojo/entity/login.entity';
import { loginServiceImpl } from 'src/service/impl/login.service.impl';
// import { LoginService } from 'src/service/login.service';

// 初始
@Module({
  imports: [Login],
  controllers: [LoginController],
  providers: [loginServiceImpl],
})
export class LoginModule {}
