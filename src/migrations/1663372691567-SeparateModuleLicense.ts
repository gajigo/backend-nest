import { MigrationInterface, QueryRunner } from "typeorm";

export class SeparateModuleLicense1663372691567 implements MigrationInterface {
    name = 'SeparateModuleLicense1663372691567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_3f116e1d86acf8b515266eb513c"`);
        await queryRunner.query(`ALTER TABLE "license" RENAME COLUMN "module" TO "moduleId"`);
        await queryRunner.query(`CREATE TABLE "module" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "UQ_620a549dbcb1fff62ea85695ca3" UNIQUE ("name"), CONSTRAINT "PK_0e20d657f968b051e674fbe3117" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "moduleId"`);
        await queryRunner.query(`ALTER TABLE "license" ADD "moduleId" uuid`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_b6ca70cf2da54a242a84358785f" UNIQUE ("event", "moduleId")`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_b6ca70cf2da54a242a84358785f"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "moduleId"`);
        await queryRunner.query(`ALTER TABLE "license" ADD "moduleId" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "module"`);
        await queryRunner.query(`ALTER TABLE "license" RENAME COLUMN "moduleId" TO "module"`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_3f116e1d86acf8b515266eb513c" UNIQUE ("event", "module")`);
    }

}
