import { MigrationInterface, QueryRunner } from "typeorm";

export class RequiredLicenseFields1663375795808 implements MigrationInterface {
    name = 'RequiredLicenseFields1663375795808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_b6ca70cf2da54a242a84358785f"`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "moduleId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_b6ca70cf2da54a242a84358785f" UNIQUE ("event", "moduleId")`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_b6ca70cf2da54a242a84358785f"`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "moduleId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_b6ca70cf2da54a242a84358785f" UNIQUE ("event", "moduleId")`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
