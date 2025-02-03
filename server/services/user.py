from ..controllers.user import *
from ..controllers.account import *
from ..controllers.session import *
from ..controllers.score import *

from datetime import datetime

from .._utils import hash_password, check_password
from ..db.db import cmd

def create_new_account(name="", email="", password=""):
  user_id = create_user(f" '{name}' ")
  crypto = hash_password(password)
  create_account(userid=user_id, password=crypto, email=email)
  session = create_session(user_id)
  return {"user_id":user_id, "session_id": session}


def login(email, password):
    q = f"""
    select *, user.id as user_id from user inner join account where account.email = '{email}' 
    and user.id = account.user_id 
    and account.status = '1'"""
    cmd.execute(q)
    datas = cmd.fetchall()
    print(f"{datas} aqui !!! {q}")
    for account in datas:
      if(check_password(account['password'], password)):
        session = create_session(account["user_id"])
        return {"user_id":account['user_id'], "session_id": session, "user_name": account["name"], "leavel": account["leavel"]}
    return None

def is_admin(user_id):
  q = f"select * from account inner join user where user.id = '{user_id}' and account.user_id = user.id"
  cmd.execute(q)
  account = cmd.fetchall()
  if account:
    account = account[0]
    if str(account["leavel"]) == "1":
      return True
    return False
  return False

def change_user_status(user_id, to):
  print (f" {str(to) == "1"} ")
  if str(to) == "1":
    active_user(user_id)
  else:
    desactive_user(user_id)

def validate_user_session(user_id, session_id):
   query = f"select * from session where user_id='{user_id}' and id = '{session_id}' "
   cmd.execute(query)
   session = cmd.fetchall()
   if session:
    session = session[0]
    return session_in_time(session)


def get_users():
  cmd.execute(f"select *, user.id as user_id from user limit 10000")
  users_array = []
  for user in cmd.fetchall():
    user_id = user["user_id"]
    #melhorar depois
    cmd.execute(f" select *, account.email, account.leavel from session inner join account where session.user_id = account.user_id having session.user_id = '{user_id}' limit 1000")
    sessions_array = []
    for session in cmd.fetchall():
      session["createdAt"] = session["createdAt"].isoformat()
      session["expireAt"] = session["expireAt"].isoformat()
      sessions_array.append(session)
    user["sessions"] = sessions_array
    users_array.append(user)
  return users_array


def create_user_score(userid, score, leavel):
  score_getted = get_score_by_user_id(user_id=userid)

  try:  
    score = int(score)
    if score_getted:
      if score > int(score_getted["score"]): #só actualiza se o novo score for maior que o anterior    
        score_id = score_getted["id"]
        print(f" Actualizando o score {score_id} ")
        update_score(id=score_id, values=f" score = '{score}' , leavel = '{leavel}'  ")
    else:
      print("Novo score {score}")
      create_score(score=score, userid=userid, leavel=leavel)
  except :
    print("Excepção ao salvar score")





def active_user(user_id):
  query = f"update account set status = '1' where user_id = '{user_id}' "
  cmd.execute(query)
  return

def desactive_user(user_id):
  query = f"update account set status = '0' where user_id = '{user_id}' "
  cmd.execute(query)
  return

def get_sessions(search=""):
  query = f"select * from session  order by createdAt desc limit 10000"
  cmd.execute(query)
  sessions = cmd.fetchall()
  sessions_array = []
  search = search.lower()
  if search == "activo":
    search = "1"
  elif search == "desactivo":
    search = "0"
  for session in sessions:
    user_id = session["user_id"]
    #melhorar depois


    query = f""" select *, account.email, account.leavel from user inner join account 
                where user.id = account.user_id and 
                (user.name like '%{search}%' or account.email like '%{search}%' or account.status like '%{search}%' )
                having user.id = '{user_id}'
                limit 1000"""
    cmd.execute(query)
    account = cmd.fetchall()
    if not account:
      continue
    account = account[0]
    session["createdAt"] = session["createdAt"].isoformat()
    session["expireAt"] = session["expireAt"].isoformat()
    session["account"] = account
    sessions_array.append(session)
    
  return sessions_array





  
      
    



# create_new_account("ana", "ana@m", "123")
# print(login('ana@m', "123"))
#print(get_sessions())