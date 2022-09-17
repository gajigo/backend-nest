import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1663367971546 implements MigrationInterface {
    name = 'Init1663367971546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lecture" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "roomId" uuid, "intervalStartdate" TIMESTAMP WITH TIME ZONE NOT NULL, "intervalEnddate" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_2abef7c1e52b7b58a9f905c9643" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."license_module_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "license" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "event" character varying NOT NULL, "module" "public"."license_module_enum" NOT NULL, CONSTRAINT "UQ_3f116e1d86acf8b515266eb513c" UNIQUE ("event", "module"), CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "check_in" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "event" character varying NOT NULL, "room" character varying NOT NULL, "lecture" character varying NOT NULL, "participant" character varying NOT NULL, "speaker" character varying NOT NULL, CONSTRAINT "UQ_b9ad3c038022c990af5db226e4a" UNIQUE ("room", "lecture", "participant"), CONSTRAINT "PK_9c026e16735aea10812a3888d6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_e61297413e805ab18bfda195dc3" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_e61297413e805ab18bfda195dc3"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "check_in"`);
        await queryRunner.query(`DROP TABLE "license"`);
        await queryRunner.query(`DROP TYPE "public"."license_module_enum"`);
        await queryRunner.query(`DROP TABLE "lecture"`);
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
