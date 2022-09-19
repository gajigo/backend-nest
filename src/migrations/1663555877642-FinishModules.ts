import { MigrationInterface, QueryRunner } from 'typeorm'

export class FinishModules1663555877642 implements MigrationInterface {
  name = 'FinishModules1663555877642'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "FK_e61297413e805ab18bfda195dc3"`
    )
    await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "roomId" SET NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "FK_e61297413e805ab18bfda195dc3" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "FK_e61297413e805ab18bfda195dc3"`
    )
    await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "roomId" DROP NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "FK_e61297413e805ab18bfda195dc3" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
