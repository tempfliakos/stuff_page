create sequence user_game_id_seq;

create table user_game
(
    id          numeric default nextval('public.user_game_id_seq') not null,
    user_id      numeric     not null,
    game_id      varchar(32)     not null,
    console      varchar(20) not null,
    title        text,
    picture      text,
    wish         boolean default false,
    star         boolean default false,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES users ("id")
);

create unique index user_game_uindex
    on user_game (id);

create sequence user_achievement_id_seq;

create table user_achievement
(
    id          numeric default nextval('public.user_achievement_id_seq') not null,
    user_id     numeric                                                   not null,
    game_id     varchar(32)                                               not null,
    title       text,
    description text,
    secret      boolean,
    picture     text,
    value       varchar(10),
    earned      boolean,
	PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES users ("id") on delete cascade on update cascade
);

create unique index user_achievement_uindex
    on user_achievement (id);