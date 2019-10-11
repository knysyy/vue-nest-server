import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1570814189515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "userId" integer, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(80) NOT NULL, "token" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "snippet" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "content" text NOT NULL, "languageId" integer, "userId" integer, CONSTRAINT "PK_70387b18f1ab2e9cdd22a710fcf" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "label" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "userId" integer, CONSTRAINT "PK_5692ac5348861d3776eb5843672" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "snippet_labels_label" ("snippetId" integer NOT NULL, "labelId" integer NOT NULL, CONSTRAINT "PK_4d1077ed241d3893668a6592464" PRIMARY KEY ("snippetId", "labelId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_01f3e86c734b2ba33717a4ee40" ON "snippet_labels_label" ("snippetId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_73536545d8c7187b55a064de09" ON "snippet_labels_label" ("labelId") `, undefined);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_69eb92e6b51565cf9a3d28f614b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "snippet" ADD CONSTRAINT "FK_f8820970452ea314ea44dc73a75" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "snippet" ADD CONSTRAINT "FK_da314b917a063a91ffbc59b28e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "label" ADD CONSTRAINT "FK_e5d0325ea0283e5f316dee36a08" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "snippet_labels_label" ADD CONSTRAINT "FK_01f3e86c734b2ba33717a4ee405" FOREIGN KEY ("snippetId") REFERENCES "snippet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "snippet_labels_label" ADD CONSTRAINT "FK_73536545d8c7187b55a064de099" FOREIGN KEY ("labelId") REFERENCES "label"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "snippet_labels_label" DROP CONSTRAINT "FK_73536545d8c7187b55a064de099"`, undefined);
        await queryRunner.query(`ALTER TABLE "snippet_labels_label" DROP CONSTRAINT "FK_01f3e86c734b2ba33717a4ee405"`, undefined);
        await queryRunner.query(`ALTER TABLE "label" DROP CONSTRAINT "FK_e5d0325ea0283e5f316dee36a08"`, undefined);
        await queryRunner.query(`ALTER TABLE "snippet" DROP CONSTRAINT "FK_da314b917a063a91ffbc59b28e6"`, undefined);
        await queryRunner.query(`ALTER TABLE "snippet" DROP CONSTRAINT "FK_f8820970452ea314ea44dc73a75"`, undefined);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_69eb92e6b51565cf9a3d28f614b"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_73536545d8c7187b55a064de09"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_01f3e86c734b2ba33717a4ee40"`, undefined);
        await queryRunner.query(`DROP TABLE "snippet_labels_label"`, undefined);
        await queryRunner.query(`DROP TABLE "label"`, undefined);
        await queryRunner.query(`DROP TABLE "snippet"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "language"`, undefined);
    }

}
