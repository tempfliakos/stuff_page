drop table user_movie;
drop sequence user_movie_seq;

create sequence user_movie_seq;
create table user_movie
(
    id numeric default nextval('public.user_movie_seq') not null,
	user_id numeric not null
		constraint user_id
			references users,
	movie_id numeric not null,
	backdrop_path text,
	poster_path text,
	release_date date,
	title text,
	seen boolean default false,
	genres varchar(30) []
);

create unique index user_movie_uindex
	on user_movie (id);