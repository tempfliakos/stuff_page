create sequence user_movie_seq;
create table user_movie
(
    id numeric default nextval('public.user_movie_seq') not null,
	user_id numeric not null
		constraint user_id
			references users,
	movie_id numeric not null,
	seen boolean default false,
	owned boolean default false,
	liza boolean default false
);

create unique index user_movie_uindex
	on user_movie (id);