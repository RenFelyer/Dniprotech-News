create table if not exists articles (
	id bigint not null auto_increment,
	content text not null,
	created date DEFAULT CURRENT_DATE(),
	description varchar(255) not null,
	locked bit not null default 0,
	picture varchar(255),
	title varchar(255) not null,
	viewed bigint not null default 0,
	primary key (id),
	FULLTEXT(title, content, description)
) engine=InnoDB;

create table if not exists tags (
  id bigint not null auto_increment,
  content varchar(255) not null,
  primary key (id),
  unique (content)
) engine=InnoDB;

create table if not exists article_tag (
  article_id bigint not null,
  tag_id bigint not null,
  primary key (article_id, tag_id),
  foreign key (tag_id) references tags (id),
  foreign key (article_id) references articles (id)
) engine=InnoDB;