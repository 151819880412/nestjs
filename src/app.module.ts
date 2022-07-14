import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { LoginModule } from './module/login.module';
import { StatusMonitorModule } from 'nest-status-monitor';
import statusMonitorConfig from './config/statusMonitor';
import { AuthModule } from './auth/auth.modules';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    LoginModule,
    CommonModule,
    // 异常监控
    StatusMonitorModule.setUp(statusMonitorConfig),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  // 全局中间件
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     // 排除路径
  //     .exclude({ path: 'login', method: RequestMethod.GET })
  //     // 监听路径
  //     .forRoutes('login');
  // }
}
