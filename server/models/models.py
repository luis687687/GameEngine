from ..db.db import cmd


cmd.execute(""" 
    create table if not exists user(
            id char(36) primary key,
            name varchar(100)

            )
            
            
            """)

cmd.execute(
  """
  create table if not exists account(
    id char(36) primary key,
    user_id char(36),
    email varchar(200) unique,
    password varchar(200),
    leavel enum('0','1') default '0' not null,
    status enum('0', '1') default '0' not null,
    foreign key (user_id) references user(id)
  )
"""
)

cmd.execute(
  """
  create table if not exists session(
  id char(36) primary key,
  user_id char(36),
  createdAt datetime default CURRENT_TIMESTAMP,
  expireAt datetime,
  foreign key (user_id) references user(id)
  )
"""
)


cmd.execute(
  """
  create table if not exists score(
    id char(36) primary key,
    user_id char(36),
    score int(11),
    leavel int(11),
    createdAt datetime,
    foreign key (user_id) references user(id)
  )
  """
)