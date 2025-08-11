import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1754898534901 implements MigrationInterface {
    name = 'InitialSchema1754898534901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."project_members_role_enum" AS ENUM('admin', 'member', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "project_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "project_id" uuid NOT NULL, "user_id" uuid NOT NULL, "role" "public"."project_members_role_enum" NOT NULL DEFAULT 'member', "joined_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b3f491d3a3f986106d281d8eb4b" UNIQUE ("project_id", "user_id"), CONSTRAINT "PK_0b2f46f804be4aea9234c78bcc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sprints_status_enum" AS ENUM('planned', 'active', 'completed')`);
        await queryRunner.query(`CREATE TABLE "sprints" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "goal" text, "project_id" uuid NOT NULL, "status" "public"."sprints_status_enum" NOT NULL DEFAULT 'planned', "start_date" TIMESTAMP, "end_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6800aa2e0f508561812c4b9afb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "issue_id" uuid NOT NULL, "author_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "worklogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "time_spent_minutes" integer NOT NULL, "work_date" date NOT NULL, "issue_id" uuid NOT NULL, "author_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d7cb5f6d19753603f7f0697544" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "color" character varying NOT NULL DEFAULT '#808080', "description" character varying, "project_id" uuid NOT NULL, CONSTRAINT "UQ_4ad2fb06c904bbfed6510589b2b" UNIQUE ("name", "project_id"), CONSTRAINT "PK_c0c4e97f76f1f3a268c7a70b925" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "issue_labels" ("issue_id" uuid NOT NULL, "label_id" uuid NOT NULL, CONSTRAINT "PK_1ac0a33ade1abb32c03516fa496" PRIMARY KEY ("issue_id", "label_id"))`);
        await queryRunner.query(`CREATE TABLE "attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "file_url" character varying NOT NULL, "file_size" integer NOT NULL, "mime_type" character varying NOT NULL, "issue_id" uuid NOT NULL, "uploaded_by" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."issues_type_enum" AS ENUM('task', 'bug', 'story', 'epic', 'subtask')`);
        await queryRunner.query(`CREATE TYPE "public"."issues_status_enum" AS ENUM('todo', 'in_progress', 'in_review', 'done')`);
        await queryRunner.query(`CREATE TYPE "public"."issues_priority_enum" AS ENUM('lowest', 'low', 'medium', 'high', 'highest')`);
        await queryRunner.query(`CREATE TABLE "issues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "type" "public"."issues_type_enum" NOT NULL DEFAULT 'task', "status" "public"."issues_status_enum" NOT NULL DEFAULT 'todo', "priority" "public"."issues_priority_enum" NOT NULL DEFAULT 'medium', "assignee_id" uuid, "reporter_id" uuid NOT NULL, "project_id" uuid NOT NULL, "sprint_id" uuid, "parent_id" uuid, "story_points" integer, "original_estimate" integer, "remaining_estimate" integer, "due_date" TIMESTAMP, "resolved_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f1b4b8a3c04159d1e185de2b525" UNIQUE ("key"), CONSTRAINT "PK_9d8ecbbeff46229c700f0449257" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f1b4b8a3c04159d1e185de2b52" ON "issues" ("key") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7fd6df20da19c630741ea9045" ON "issues" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_11f35e8296e10c229e7b68c68d" ON "issues" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d95aa108063de2be63c1401d18" ON "issues" ("sprint_id") `);
        await queryRunner.query(`CREATE TYPE "public"."versions_status_enum" AS ENUM('unreleased', 'released', 'archived')`);
        await queryRunner.query(`CREATE TABLE "versions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "project_id" uuid NOT NULL, "status" "public"."versions_status_enum" NOT NULL DEFAULT 'unreleased', "release_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1c6389e22fd50a45170d4a902e5" UNIQUE ("name", "project_id"), CONSTRAINT "PK_921e9a820c96cc2cd7d4b3a107b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('active', 'archived', 'on_hold')`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "key" character varying NOT NULL, "description" text, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'active', "owner_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_63e67599567b2126cfef14e1474" UNIQUE ("key"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63e67599567b2126cfef14e147" ON "projects" ("key") `);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'member', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password_hash" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'member', "avatar" character varying, "is_active" boolean NOT NULL DEFAULT true, "email_verified" boolean NOT NULL DEFAULT false, "last_login_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_b5729113570c20c7e214cf3f58d" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_e89aae80e010c2faa72e6a49ce8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sprints" ADD CONSTRAINT "FK_82145010051f3f2fc94671c0b35" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4ce924bcd63bee0fccc7fe1d8f6" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worklogs" ADD CONSTRAINT "FK_e6a6d1b2d06ce74b4bedef786f4" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worklogs" ADD CONSTRAINT "FK_e0b5129f68396cad5b85f22ebe6" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "labels" ADD CONSTRAINT "FK_68b0da461f6765824f6db642f12" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_labels" ADD CONSTRAINT "FK_68c7892926826f61d6a4a6f564d" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue_labels" ADD CONSTRAINT "FK_b0766ecbfc520efad8879ef13e3" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_dd7c238245012c896f736aa9bbf" FOREIGN KEY ("issue_id") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_7da282c871a9b6497da2cecf869" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_394a6ced54c634dfadea1618d2a" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_11f35e8296e10c229e7b68c68d4" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_d95aa108063de2be63c1401d188" FOREIGN KEY ("sprint_id") REFERENCES "sprints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issues" ADD CONSTRAINT "FK_98fad9e9dacbfd3f12a9628578e" FOREIGN KEY ("parent_id") REFERENCES "issues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "versions" ADD CONSTRAINT "FK_3c224c5cd390dbb3b086101470f" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_b1bd2fbf5d0ef67319c91acb5cf" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_b1bd2fbf5d0ef67319c91acb5cf"`);
        await queryRunner.query(`ALTER TABLE "versions" DROP CONSTRAINT "FK_3c224c5cd390dbb3b086101470f"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_98fad9e9dacbfd3f12a9628578e"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_d95aa108063de2be63c1401d188"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_11f35e8296e10c229e7b68c68d4"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_394a6ced54c634dfadea1618d2a"`);
        await queryRunner.query(`ALTER TABLE "issues" DROP CONSTRAINT "FK_7da282c871a9b6497da2cecf869"`);
        await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_dd7c238245012c896f736aa9bbf"`);
        await queryRunner.query(`ALTER TABLE "issue_labels" DROP CONSTRAINT "FK_b0766ecbfc520efad8879ef13e3"`);
        await queryRunner.query(`ALTER TABLE "issue_labels" DROP CONSTRAINT "FK_68c7892926826f61d6a4a6f564d"`);
        await queryRunner.query(`ALTER TABLE "labels" DROP CONSTRAINT "FK_68b0da461f6765824f6db642f12"`);
        await queryRunner.query(`ALTER TABLE "worklogs" DROP CONSTRAINT "FK_e0b5129f68396cad5b85f22ebe6"`);
        await queryRunner.query(`ALTER TABLE "worklogs" DROP CONSTRAINT "FK_e6a6d1b2d06ce74b4bedef786f4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4ce924bcd63bee0fccc7fe1d8f6"`);
        await queryRunner.query(`ALTER TABLE "sprints" DROP CONSTRAINT "FK_82145010051f3f2fc94671c0b35"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_e89aae80e010c2faa72e6a49ce8"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_b5729113570c20c7e214cf3f58d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63e67599567b2126cfef14e147"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
        await queryRunner.query(`DROP TABLE "versions"`);
        await queryRunner.query(`DROP TYPE "public"."versions_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d95aa108063de2be63c1401d18"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11f35e8296e10c229e7b68c68d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7fd6df20da19c630741ea9045"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1b4b8a3c04159d1e185de2b52"`);
        await queryRunner.query(`DROP TABLE "issues"`);
        await queryRunner.query(`DROP TYPE "public"."issues_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."issues_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."issues_type_enum"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
        await queryRunner.query(`DROP TABLE "issue_labels"`);
        await queryRunner.query(`DROP TABLE "labels"`);
        await queryRunner.query(`DROP TABLE "worklogs"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "sprints"`);
        await queryRunner.query(`DROP TYPE "public"."sprints_status_enum"`);
        await queryRunner.query(`DROP TABLE "project_members"`);
        await queryRunner.query(`DROP TYPE "public"."project_members_role_enum"`);
    }

}
