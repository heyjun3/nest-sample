CREATE TABLE
    "author" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid (),
        "first_name" CHARACTER VARYING NOT NULL,
        "last_name" CHARACTER VARYING NOT NULL,
        CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id")
    );

CREATE TABLE
    "post" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid (),
        "author_id" UUID NOT NULL,
        "title" CHARACTER VARYING NOT NULL,
        "votes" INTEGER NOT NULL,
        CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")
    );

ALTER TABLE "post"
ADD CONSTRAINT "FK_2f1a9ca8908fc8168bc18437f62" FOREIGN KEY ("author_id") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;

CREATE TABLE
    users (
        "id" UUID NOT NULL DEFAULT gen_random_uuid (),
        "name" CHARACTER VARYING NOT NULL,
        CONSTRAINT pk_users_id PRIMARY KEY ("id")
    );
