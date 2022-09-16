import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTotem1663298325082 implements MigrationInterface {
    name = 'AddTotem1663298325082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "check_in" ("participant" character varying NOT NULL, CONSTRAINT "PK_7201bb671f59e1cab0fc035f690" PRIMARY KEY ("participant"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "check_in"`);
    }

}
