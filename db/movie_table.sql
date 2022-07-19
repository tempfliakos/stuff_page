create table movies
(
    id numeric not null,
	backdrop_path text,
	poster_path text,
	release_date date,
	title text,
	genres varchar(30) []
);

create unique index movies_uindex
	on movies(id);