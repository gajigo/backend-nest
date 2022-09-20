import { MigrationInterface, QueryRunner } from "typeorm";

export class CreationDates1663693264320 implements MigrationInterface {
    name = 'CreationDates1663693264320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" ADD "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "module" ADD "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "module" DROP COLUMN "created"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "created"`);
    }

}
