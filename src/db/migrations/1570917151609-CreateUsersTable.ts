import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1570917151609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(80) NOT NULL, "token" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "user"`, undefined);
  }
}
