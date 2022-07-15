import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('45秒');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('10秒');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('5秒');
  }
}
