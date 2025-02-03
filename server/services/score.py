from ..db.db import cmd
from ..controllers.score import *
from ..controllers.account import get_account_by_userid

def get_scores_with_user():
  scores = get_all_scores()
  if not scores:
    return []
  for score in scores:
    cmd.execute(f" select user.id as user_id, name from user inner join score where user.id = score.user_id and score.id = '{score["id"]}' ")
    user = cmd.fetchall()
    if user:
      user = user[0]
      account = get_account_by_userid(user["user_id"])
      user["email"] = account["email"]
    else:
      user = {}
    score["user"] = user
  return scores


print(get_scores_with_user())