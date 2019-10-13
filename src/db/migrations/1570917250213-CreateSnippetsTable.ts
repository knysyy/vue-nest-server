import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSnippetsTable1570917250213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "snippet" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "content" text NOT NULL, "favorite" boolean NOT NULL DEFAULT false, "languageId" integer, "userId" integer NOT NULL, CONSTRAINT "PK_70387b18f1ab2e9cdd22a710fcf" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "snippet" ADD CONSTRAINT "FK_f8820970452ea314ea44dc73a75" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "snippet" ADD CONSTRAINT "FK_da314b917a063a91ffbc59b28e6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "snippet" DROP CONSTRAINT "FK_da314b917a063a91ffbc59b28e6"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "snippet" DROP CONSTRAINT "FK_f8820970452ea314ea44dc73a75"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "snippet"`, undefined);
  }
}
