create sequence user_todo_type_seq;
create table todo_type
(
    id numeric PRIMARY KEY default nextval('public.user_todo_type_seq') not null,
    name varchar(30) not null
	
);

create unique index todo_type_uindex
	on todo_type (id);

insert into todo_type(name) values ('Általános');



create sequence user_todo_seq;
create table todo
(
    id numeric PRIMARY KEY default nextval('public.user_todo_seq') not null,
	user_id numeric not null
		constraint user_id
			references users,
    type_id numeric not null
		constraint type_id
			references todo_type,
    name varchar(100),
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone,
    done timestamp with time zone
);

create unique index todo_uindex
	on todo (id);