drop table users;
drop sequence user_id_seq;

create sequence user_id_seq;

create table users
(
	-- Only integer types can be auto increment
	id numeric default nextval('public.user_id_seq') not null,
	email varchar(30) not null,
	password text not null
);

create unique index user_email_uindex
	on users (email);

create unique index user_id_uindex
	on users (id);

alter table users
	add constraint user_pk
		primary key (id);