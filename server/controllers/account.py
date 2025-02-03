from ..db.db import cmd, connection
from .._utils import create_obj

def create_account(userid, password, email):
  return create_obj("account", f"'{userid}', '{email}', '{password}', '0', '0' ")

def get_account_by_id(id):
  cmd.execute(f"select * from account where id = '{id}' ")
  try:
    account = cmd.fetchall()[0]
    return account
  except:
    return None;

def get_account_by_userid(user_id):
  cmd.execute(f"select * from account where user_id = '{user_id}' ")
  try:
    account = cmd.fetchall()[0]
    return account
  except Exception as ex:
    print(f" Erro ao pegar a conta por userid {user_id} :  {ex}")
    return {};

def get_all_accounts():
  cmd.execute(f"select * from account limit 10000")
  account = cmd.fetchall()
  return account


def delete_account(id):
  cmd.execute(f" delete from account where id='{id}' ")
  connection.commit()

def update_account(id, values):
  cmd.execute(f"update account set {values} where id='{id}'")
  connection.commit()

#create_account("'luis Marques'")
# print(get_all_accounts())