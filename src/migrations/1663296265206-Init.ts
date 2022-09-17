import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1663296265206 implements MigrationInterface {
  name = 'Init1663296265206'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "FK_c97ed56b5226fa88243c696b702"`
    )
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "FK_650cd2f20dc4dff03882d3959b3"`
    )
    await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fa4e9ca4d014300736531bee364"`)
    await queryRunner.query(`ALTER TABLE "lecture" DROP COLUMN "attendanceMode"`)
    await queryRunner.query(`ALTER TABLE "lecture" DROP COLUMN "eventId"`)
    await queryRunner.query(`ALTER TABLE "lecture" DROP COLUMN "languageId"`)
    await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "description"`)
    await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "eventId"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "room" ADD "eventId" uuid NOT NULL`)
    await queryRunner.query(`ALTER TABLE "room" ADD "description" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "lecture" ADD "languageId" uuid NOT NULL`)
    await queryRunner.query(`ALTER TABLE "lecture" ADD "eventId" uuid NOT NULL`)
    await queryRunner.query(`ALTER TABLE "lecture" ADD "attendanceMode" text NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_fa4e9ca4d014300736531bee364" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "FK_650cd2f20dc4dff03882d3959b3" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "FK_c97ed56b5226fa88243c696b702" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
