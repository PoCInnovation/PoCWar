# Migration `20201009035746-remove_input_output_example`

This migration has been generated at 10/9/2020, 3:57:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Lang" AS ENUM ('c', 'cpp', 'go', 'javascript', 'python', 'rust', 'ruby');

CREATE TYPE "Role" AS ENUM ('user', 'admin');

CREATE TABLE "public"."User" (
"id" text  NOT NULL ,
"role" "Role" NOT NULL DEFAULT E'user',
"name" text  NOT NULL ,
"email" text  NOT NULL ,
"password" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Challenge" (
"id" text  NOT NULL ,
"name" text  NOT NULL ,
"slug" text  NOT NULL ,
"authorId" text  NOT NULL ,
"description" text  NOT NULL ,
"category" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Test" (
"id" text  NOT NULL ,
"name" text  NOT NULL ,
"out" text  NOT NULL ,
"err" text  NOT NULL ,
"ret" integer  NOT NULL ,
"args" text  NOT NULL ,
"challengeId" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."CodeSource" (
"lang" "Lang" NOT NULL ,
"code" text  NOT NULL ,
"challengeId" text  NOT NULL ,
"authorId" text  NOT NULL ,
"lastResult" text   ,
"passAllTests" boolean  NOT NULL DEFAULT false)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "Challenge.slug_unique" ON "public"."Challenge"("slug")

CREATE UNIQUE INDEX "ux_codesource_author_challenge" ON "public"."CodeSource"("authorId","challengeId")

ALTER TABLE "public"."Challenge" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Test" ADD FOREIGN KEY ("challengeId")REFERENCES "public"."Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."CodeSource" ADD FOREIGN KEY ("challengeId")REFERENCES "public"."Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."CodeSource" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200825141650-init..20201009035746-remove_input_output_example
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -40,10 +40,8 @@
   codeSources    CodeSource[]
   author         User         @relation(fields: [authorId], references: [id])
   authorId       String
   description    String
-  input_example  String
-  output_example String
   category       String
 }
 model Test {
```


