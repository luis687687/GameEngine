import mysql.connector
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os, json
from .services.user import create_new_account, login, validate_user_session, is_admin, get_users, get_sessions, active_user, desactive_user, create_user_score, change_user_status
from .controllers.score import get_score_by_user_id
from .services.score import get_scores_with_user
from .controllers.session import session_in_time_by_id, get_session_by_id

host="localhost"
port=8080
passkey="luis001"
adminemail="luismarques@gmail.com"







class CustomizedHTTPRequestHandler(SimpleHTTPRequestHandler):


  def ok_header(self):
    self.send_response(200)
    self.send_header("Content-type" , "Application/json")
    self.end_headers()

  def no_permition_header(self):
    self.send_response(303)
    self.send_header("Content-type" , "Application/json")
    self.end_headers()
  
  def do_GET(self):
    if self.path == "/create":
      self.path = "/pages/create-account.html"
      return super().do_GET()
    if self.path == "/login":
      self.path = "/pages/login.html"
      return super().do_GET()
    if self.path == "/":
      return super().do_GET()
    if self.path == "/admin":
      self.path = "/admin.html"
      return super().do_GET()
    
    ## user
    if self.path.__contains__("/user/admin_check/"):
      array = self.path.split("admin_check/")
      admin_id = array[1]
      self.ok_header()
      self.wfile.write(json.dumps({"is":is_admin(admin_id)}).encode("utf-8"))
      return
    #end user 
    ####################################################################

    #### game routes #####################################
    ## headers : {authorization: session_id}
    if self.path == "/game/score":
      session_id = self.headers.get("authentication")
      if not session_id or not session_in_time_by_id(session_id):
        self.no_permition_header()
        self.wfile.write(json.dumps({"message": "Sem autorizaÇão"}).encode("utf-8"))
        return
      scores = get_scores_with_user()
      self.ok_header()
      self.wfile.write(json.dumps(scores).encode("utf-8"))
      return
    
    if self.path.__contains__("/game/score/"):
      try:
        session_id = self.headers.get("authorization")
        user_id = self.path.split("/game/score/")[1]
        if validate_user_session(session_id=session_id, user_id=user_id):
          self.ok_header()
          score = get_score_by_user_id(user_id)
          self.wfile.write(json.dumps(score).encode("utf-8"))
        else:
          raise TypeError("Sessão inválida !")
      except Exception as ex:
        self.ok_header()
        self.wfile.write(json.dumps({"message": f" {ex} ", "status": "error"}).encode("utf-8"))
        print (f"Erro ao fazer o get my score {ex} - {user_id} - {session_id} {self.path}")
      return

    #end game routes
    #################################################################################################

    if self.path.__contains__(".otf") or self.path.__contains__(".jpg") or self.path.__contains__(".png") or  self.path.__contains__(".mp3") or  self.path.__contains__(".css") or self.path.__contains__(".js") or self.path.__contains__(".ttf"): 
      return super().do_GET()
  
  def do_POST(self):
    content_type = self.headers.get('Content-Type')
    

    if content_type.__contains__(";"):
      content_type, _ = content_type.split(';', 1)
    if str(content_type).lower() == 'application/json':
      # Se for JSON, lidar com os dados JSON
      content_length = int(self.headers.get('Content-Length'))
      post_data = self.rfile.read(content_length)
      data = json.loads(post_data)
      
      #create user
      if self.path == "/user":
        name = data["name"]
        email = data["email"]
        password = data["password"]
        try:
          response = create_new_account(email=email, password=password, name=name)
          json_response = {
            "status": "ok",
            "user_id": response["user_id"],
            "session_id": response["session_id"]
          }
          self.ok_header()
          self.wfile.write(json.dumps(json_response).encode('utf-8'))
        except mysql.connector.errors.IntegrityError:
          self.send_response(300)
          self.send_header('Content-type', 'application/json')
          self.end_headers()
          self.wfile.write(json.dumps({"message": "email já está em uso"}).encode('utf-8'))
        return

      if self.path == "/user/login":
        email = data["email"]
        password = data["password"]
        response = login(email=email, password=password)
     
        if response:
          self.ok_header()
          self.wfile.write(json.dumps(response).encode("utf-8"))
        
        else:
          self.send_response(404)
          self.send_header("Content-Type", "Application/json")
          self.end_headers()
          self.wfile.write(json.dumps({"message": "user não encontrado"}).encode("utf-8"))
        return

      if self.path == "/user/check_session":
        user_id = data["user_id"]
        session_id = data["session_id"]
        if validate_user_session(user_id=user_id, session_id=session_id):
          self.ok_header()
          self.wfile.write(json.dumps({"status": "ok"}).encode("utf-8"))
        else:
            self.send_response(503)
            self.send_header("Content-type" , "Application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "error", "user_id":user_id, "session_id":session_id}).encode("utf-8"))
        return
      
      #{status, session_id}
      if self.path.__contains__("/user/status/"):
        admin_and_user_id = self.path.replace("/user/status/", "")
        admin_and_user_id = admin_and_user_id.split("/")
        admin_id, user_id = (admin_and_user_id[0], admin_and_user_id[1])
        if not validate_user_session(session_id=data["session_id"], user_id=admin_id):
          self.no_permition_header()
          self.wfile.write(json.dumps({"message": "Sessão inválida",  "status" : "error"}).encode("utf-8"))
          return
        if is_admin(admin_id):
          
          change_user_status(user_id, data["status"])
          self.ok_header()
          self.wfile.write(json.dumps({ "message" : "alterado com sucesso!", "status" : "ok"}).encode("utf-8"))
        else:
            self.no_permition_header()
            self.wfile.write(json.dumps({"message": "Sem autorização",  "status" : "error"}).encode("utf-8"))
        return
      
      #{search, session_id}
      if self.path.__contains__("/user/sessions/"):
        admin_id = self.path.split("sessions/")[1]
        status = 200
        search = data["search"]
        session_id = data["session_id"]
        if not validate_user_session(session_id=session_id, user_id=admin_id):
          self.no_permition_header()
          self.wfile.write(json.dumps({"message": "Sessão inválida",  "status" : "error"}).encode("utf-8"))
          return
        
        if is_admin(admin_id) != True :
          status = 403
          response = {"status": "sem permissão"}
        else:
          response = get_sessions(search=search)
        self.send_response(status)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(response).encode("utf-8"))
        return


      #game routes     {user_id, score, session_id, leavel}
      if self.path == "/game/score":
        score = data["score"]
        session_id = data["session_id"]
        user_id = data["user_id"]
        leavel = data["leavel"]
        if not validate_user_session(session_id=session_id, user_id=user_id):
          self.no_permition_header()
          return self.wfile.write(json.dumps({"message": "sessão inválida"}).encode("utf-8"))
        self.ok_header()
        create_user_score(leavel=leavel, score=score, userid=user_id)
        self.wfile.write(json.dumps({"message": "sucesso"}).encode("utf-8"))
        return
      return

    else:
      self.send_response(500)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(json.dumps({"message": "não é uma requisição json válida"}).encode('utf-8'))
    
  
  



try:
  server = HTTPServer((host, port), CustomizedHTTPRequestHandler)
  server.serve_forever()
except:
  print("Feichando o server")
  server.server_close()
  exit()


