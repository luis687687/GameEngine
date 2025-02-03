from ..db.db import cmd, connection
from .._utils import create_obj
import uuid
from datetime import datetime, timedelta

def create_session(user_id):
  expireAt = datetime.now()
  expireAt = expireAt + timedelta(minutes=60)
  return create_obj("session  (id, user_id, expireAt) ", f"'{user_id}', '{expireAt}'")

def get_session_by_id(id):
  cmd.execute(f"select * from session where id = '{id}' ")
  try:
    seesion = cmd.fetchall()[0]
    return seesion
  except:
    return None;

def get_all_sessions():
  cmd.execute(f"select * from session limit 10000")
  sessions = cmd.fetchall()
  return sessions

def session_in_time(session):
  actualdate = datetime.now()
  expireAt = session['expireAt']
  if expireAt <= actualdate:
    return False
  return True

def session_in_time_by_id(session_id):
  cmd.execute(f" select * from session where id = '{session_id}' ")
  sessions = cmd.fetchall()
  if sessions:
    return session_in_time(sessions[0])
  return False


def delete_session(id):
  cmd.execute(f" delete from session where id='{id}' ")
  connection.commit()

def delete_session_by_user(user_id):
  cmd.execute(f" delete from session where id='{user_id}' ")
  connection.commit()

def update_session(id, values):
  cmd.execute(f"update session set {values} where id='{id}'")
  connection.commit()

#create_session("'luis Marques'")
