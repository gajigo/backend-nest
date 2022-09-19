import { MigrationInterface, QueryRunner } from 'typeorm'

export class CascadeDeleteModule1663378062203 implements MigrationInterface {
  name = 'CascadeDeleteModule1663378062203'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "license" DROP CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff"`
    )
    await queryRunner.query(
      `ALTER TABLE "license" ADD CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "license" DROP CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff"`
    )
    await queryRunner.query(
      `ALTER TABLE "license" ADD CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
