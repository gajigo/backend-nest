import { MigrationInterface, QueryRunner } from "typeorm";

export class Speakers1663388186844 implements MigrationInterface {
    name = 'Speakers1663388186844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "check_in" DROP CONSTRAINT "UQ_b9ad3c038022c990af5db226e4a"`);
        await queryRunner.query(`CREATE TABLE "speaker" ("id" character varying NOT NULL, CONSTRAINT "PK_8441432fc32d602d417bf2687a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "check_in" DROP COLUMN "speaker"`);
        await queryRunner.query(`ALTER TABLE "check_in" ADD CONSTRAINT "UQ_c4b4756b1b2fecffee0b035f322" UNIQUE ("event", "room", "lecture", "participant")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "check_in" DROP CONSTRAINT "UQ_c4b4756b1b2fecffee0b035f322"`);
        await queryRunner.query(`ALTER TABLE "check_in" ADD "speaker" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "speaker"`);
        await queryRunner.query(`ALTER TABLE "check_in" ADD CONSTRAINT "UQ_b9ad3c038022c990af5db226e4a" UNIQUE ("room", "lecture", "participant")`);
    }

}
