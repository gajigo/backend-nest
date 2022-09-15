import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1663246670711 implements MigrationInterface {
  name = 'Init1663246670711'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "language" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying NOT NULL, "eventId" uuid NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "lecture" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "attendanceMode" text NOT NULL, "eventId" uuid NOT NULL, "roomId" uuid, "languageId" uuid NOT NULL, "intervalStartdate" TIMESTAMP WITH TIME ZONE NOT NULL, "intervalEnddate" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_2abef7c1e52b7b58a9f905c9643" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_fa4e9ca4d014300736531bee364" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "FK_c97ed56b5226fa88243c696b702" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "FK_e61297413e805ab18bfda195dc3" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "lecture" ADD CONSTRAINT "FK_650cd2f20dc4dff03882d3959b3" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "FK_650cd2f20dc4dff03882d3959b3"`
    )
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "FK_e61297413e805ab18bfda195dc3"`
    )
    await queryRunner.query(
      `ALTER TABLE "lecture" DROP CONSTRAINT "FK_c97ed56b5226fa88243c696b702"`
    )
    await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fa4e9ca4d014300736531bee364"`)
    await queryRunner.query(`DROP TABLE "event"`)
    await queryRunner.query(`DROP TABLE "lecture"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "tag"`)
    await queryRunner.query(`DROP TABLE "room"`)
    await queryRunner.query(`DROP TABLE "language"`)
  }
}
