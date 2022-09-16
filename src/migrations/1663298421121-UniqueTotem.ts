import { MigrationInterface, QueryRunner } from 'typeorm'

export class UniqueTotem1663298421121 implements MigrationInterface {
  name = 'UniqueTotem1663298421121'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "check_in" ADD "room" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "check_in" ADD "lecture" character varying NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "check_in" ADD CONSTRAINT "UQ_66ad191a3827b422835037389d7" UNIQUE ("lecture", "participant")`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "check_in" DROP CONSTRAINT "UQ_66ad191a3827b422835037389d7"`
    )
    await queryRunner.query(`ALTER TABLE "check_in" DROP COLUMN "lecture"`)
    await queryRunner.query(`ALTER TABLE "check_in" DROP COLUMN "room"`)
  }
}
