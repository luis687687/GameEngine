from ..db.db import cmd, connection
from .._utils import create_obj

def create_user(values):
  return create_obj("user", values)

def get_user_by_id(id):
  cmd.execute(f"select * from user where id = '{id}' ")
  try:
    user = cmd.fetchall()[0]
    return user
  except:
    return None;

def get_all_users():
  cmd.execute(f"select * from user limit 10000")
  user = cmd.fetchall()
  return user

def delete_user(id):
  cmd.execute(f" delete from user where id='{id}' ")
  connection.commit()

def update_user(id, values):
  cmd.execute(f"update user set {values} where id='{id}'")
  connection.commit()

#create_user("'luis Marques'")
delete_user("9a18e85d-84d5-464f-aa71-9c041c4480a0")