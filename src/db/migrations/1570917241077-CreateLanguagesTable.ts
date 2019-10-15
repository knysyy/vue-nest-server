import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLanguagesTable1570917241077 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "language" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "language"`, undefined);
  }
}
