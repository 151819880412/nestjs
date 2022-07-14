import { join } from 'path';
export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  databae: 'nest',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  // 字段同步
  synchronize: true,
};
