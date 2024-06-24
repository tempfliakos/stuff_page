create sequence book_seq;

create table books
(
    id numeric default nextval('public.book_seq') not null,
    user_id numeric not null
		constraint user_id
			references users,
	book_id text,
	author text,
	description text,
	picture text,
	page numeric(3),
	priority numeric(3) default 999,
	title text,
	owned bool default false
);

create unique index books_uindex
	on books(id);
