import { registerAs } from '@nestjs/config';

/**
 * registerAs  注册命名空间
 * @date 2022-07-08
 * @param {any} 'coffees'
 * @param {any} (
 * @returns {any}
 */
export default registerAs('coffees', () => ({
  foo: 'bar',
}));
