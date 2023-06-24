create table article_tag (article_id bigint not null, tag_id bigint not null, primary key (article_id, tag_id)) engine=InnoDB
create table articles (id bigint not null auto_increment, content varchar(5000) not null, created date, description varchar(255) not null, locked bit not null, path_to_image varchar(255) not null, title varchar(255) not null, viewed bigint not null, primary key (id)) engine=InnoDB
create table tags (id bigint not null auto_increment, content varchar(255) not null, primary key (id)) engine=InnoDB
alter table if exists tags drop index if exists UK_lewn3wbj0xw05iacn8oso2y4e
alter table if exists tags add constraint UK_lewn3wbj0xw05iacn8oso2y4e unique (content)
alter table if exists article_tag add constraint FK3nvn435qf5rn1e9ph51e3r55h foreign key (tag_id) references tags (id)
alter table if exists article_tag add constraint FKkfkj25ialwd9il3fajd6vkmv5 foreign key (article_id) references articles (id)