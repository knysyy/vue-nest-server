import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSnippetsTable1570917258515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "snippet_labels_label" ("snippetId" integer NOT NULL, "labelId" integer NOT NULL, CONSTRAINT "PK_4d1077ed241d3893668a6592464" PRIMARY KEY ("snippetId", "labelId"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_01f3e86c734b2ba33717a4ee40" ON "snippet_labels_label" ("snippetId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_73536545d8c7187b55a064de09" ON "snippet_labels_label" ("labelId") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "snippet_labels_label" ADD CONSTRAINT "FK_01f3e86c734b2ba33717a4ee405" FOREIGN KEY ("snippetId") REFERENCES "snippet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "snippet_labels_label" ADD CONSTRAINT "FK_73536545d8c7187b55a064de099" FOREIGN KEY ("labelId") REFERENCES "label"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "snippet_labels_label" DROP CONSTRAINT "FK_73536545d8c7187b55a064de099"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "snippet_labels_label" DROP CONSTRAINT "FK_01f3e86c734b2ba33717a4ee405"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_73536545d8c7187b55a064de09"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_01f3e86c734b2ba33717a4ee40"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "snippet_labels_label"`, undefined);
  }
}
