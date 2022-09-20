import { MigrationInterface, QueryRunner } from 'typeorm'

export class SimplifyModules1663691144233 implements MigrationInterface {
  name = 'SimplifyModules1663691144233'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "license" DROP CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff"`
    )
    await queryRunner.query(
      `ALTER TABLE "license" DROP CONSTRAINT "UQ_b6ca70cf2da54a242a84358785f"`
    )
    await queryRunner.query(`ALTER TABLE "module" DROP CONSTRAINT "PK_0e20d657f968b051e674fbe3117"`)
    await queryRunner.query(`ALTER TABLE "module" DROP COLUMN "id"`)
    await queryRunner.query(`ALTER TABLE "module" DROP COLUMN "created"`)
    await queryRunner.query(`ALTER TABLE "module" DROP COLUMN "updated"`)
    await queryRunner.query(`ALTER TABLE "module" DROP COLUMN "removed"`)
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "created"`)
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "updated"`)
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "removed"`)
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "moduleId"`)
    await queryRunner.query(`ALTER TABLE "license" ADD "moduleName" character varying NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "module" ADD CONSTRAINT "PK_620a549dbcb1fff62ea85695ca3" PRIMARY KEY ("name")`
    )
    await queryRunner.query(`ALTER TABLE "module" DROP CONSTRAINT "UQ_620a549dbcb1fff62ea85695ca3"`)
    await queryRunner.query(
      `ALTER TABLE "license" ADD CONSTRAINT "UQ_7fbf4a68bc04a9aa21daa8e9aa8" UNIQUE ("event", "moduleName")`
    )
    await queryRunner.query(
      `ALTER TABLE "license" ADD CONSTRAINT "FK_6814861b50d9fb77b54957ce168" FOREIGN KEY ("moduleName") REFERENCES "module"("name") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "license" DROP CONSTRAINT "FK_6814861b50d9fb77b54957ce168"`
    )
    await queryRunner.query(
      `ALTER TABLE "license" DROP CONSTRAINT "UQ_7fbf4a68bc04a9aa21daa8e9aa8"`
    )
    await queryRunner.query(
      `ALTER TABLE "module" ADD CONSTRAINT "UQ_620a549dbcb1fff62ea85695ca3" UNIQUE ("name")`
    )
    await queryRunner.query(`ALTER TABLE "module" DROP CONSTRAINT "PK_620a549dbcb1fff62ea85695ca3"`)
    await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "moduleName"`)
    await queryRunner.query(`ALTER TABLE "license" ADD "moduleId" uuid NOT NULL`)
    await queryRunner.query(`ALTER TABLE "license" ADD "removed" TIMESTAMP WITH TIME ZONE`)
    await queryRunner.query(
      `ALTER TABLE "license" ADD "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "license" ADD "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(`ALTER TABLE "module" ADD "removed" TIMESTAMP WITH TIME ZONE`)
    await queryRunner.query(
      `ALTER TABLE "module" ADD "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "module" ADD "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    )
    await queryRunner.query(
      `ALTER TABLE "module" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    )
    await queryRunner.query(
      `ALTER TABLE "module" ADD CONSTRAINT "PK_0e20d657f968b051e674fbe3117" PRIMARY KEY ("id")`
    )
    await queryRunner.query(
      `ALTER TABLE "license" ADD CONSTRAINT "UQ_b6ca70cf2da54a242a84358785f" UNIQUE ("event", "moduleId")`
    )
    await queryRunner.query(
      `ALTER TABLE "license" ADD CONSTRAINT "FK_3dbe6a7b7f729b256ff27b96aff" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }
}
