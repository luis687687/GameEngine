import uuid
from .db.db import cmd, connection

def create_obj(model, values):
  id = str(uuid.uuid4())

  cmd.execute(f"""
  insert into {model} values ('{id}', {values})

""")
  connection.commit()
  return id

  


import bcrypt
# Função para gerar o hash de uma senha
def hash_password(password):
    # Gerando um sal (salt) aleatório
    salt = bcrypt.gensalt()
    # Gerando o hash com o sal
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

# Função para verificar uma senha
def check_password(stored_hash, password):
    # Verificando se o hash da senha fornecida corresponde ao hash armazenado
    return bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8'))



#print(hash_password("hack001"))