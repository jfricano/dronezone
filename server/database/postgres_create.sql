
-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;


-- CREATE SEQUENCE jobApps_id_seq;

-- create the user table
CREATE TABLE  public.users (
	"_id" serial PRIMARY KEY,
	"email" text NOT NULL
	-- CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- create the jobApps table
CREATE TABLE public.job_apps (
	-- "_id" bigint PRIMARY KEY DEFAULT pseudo_encrypt(nextval('jobApps_id_seq')),
  "_id" serial PRIMARY KEY,
	"company" text NOT NULL,
  "role" text NOT NULL,
	"status" text NOT NULL,
	"date_applied" date DEFAULT CURRENT_DATE,
	"priority" smallint DEFAULT 2,
	"link" text,
	"notes" text,
  "user_id" bigint,
	-- CONSTRAINT "job_apps_pk" PRIMARY KEY ("_id"),
  CONSTRAINT "job_apps_fk" FOREIGN KEY ("user_id") REFERENCES public.users("_id")
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE public.jobApps ADD CONSTRAINT "jobApps_fk" FOREIGN KEY ("person_id") REFERENCES public.users("_id");
