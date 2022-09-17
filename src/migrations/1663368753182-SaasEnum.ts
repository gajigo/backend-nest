import { MigrationInterface, QueryRunner } from "typeorm";

export class SaasEnum1663368753182 implements MigrationInterface {
    name = 'SaasEnum1663368753182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_3f116e1d86acf8b515266eb513c"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "module"`);
        await queryRunner.query(`DROP TYPE "public"."license_module_enum"`);
        await queryRunner.query(`ALTER TABLE "license" ADD "module" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_3f116e1d86acf8b515266eb513c" UNIQUE ("event", "module")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_3f116e1d86acf8b515266eb513c"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "module"`);
        await queryRunner.query(`CREATE TYPE "public"."license_module_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "license" ADD "module" "public"."license_module_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_3f116e1d86acf8b515266eb513c" UNIQUE ("event", "module")`);
    }

}
