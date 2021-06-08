--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Ubuntu 11.3-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.5

-- Started on 2019-09-11 16:56:10 PDT

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
	"_id" serial NOT NULL,
	"email" varchar NOT NULL, -- email type??
	"password" varchar NOT NULL, -- encrypted??
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- create the jobApps table
CREATE TABLE public.job_apps (
	-- "_id" bigint PRIMARY KEY DEFAULT pseudo_encrypt(nextval('jobApps_id_seq')),
  "_id" serial NOT NULL,
	"company" varchar NOT NULL,
  "role" varchar NOT NULL,
	"status" smallint NOT NULL,
	"date_applied" date,
	"priority" smallint DEFAULT 2,
	"link" text,
	"notes" text,
  "user_id" bigint,
	CONSTRAINT "job_apps_pk" PRIMARY KEY ("_id"),
  CONSTRAINT "job_apps_fk" FOREIGN KEY ("user_id") REFERENCES public.users("_id")
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE public.jobApps ADD CONSTRAINT "jobApps_fk" FOREIGN KEY ("person_id") REFERENCES public.users("_id");
