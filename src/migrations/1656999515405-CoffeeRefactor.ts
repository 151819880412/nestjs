import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1656999515405 implements MigrationInterface {
  /**
   * 迁移的方法
   * @date 2022-07-05
   * @param {any} queryRunner:QueryRunner
   * @returns {any}
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" to "title"`,
    );
  }

  /**
   * 迁移失败回滚的方法
   * @date 2022-07-05
   * @param {any} queryRunner:QueryRunner
   * @returns {any}
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" to "name"`,
    );
  }
}
