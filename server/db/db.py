import mysql.connector
# Configuração do banco de dados
DATABASE_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "game"
}

# Conexão
connection = mysql.connector.connect(**DATABASE_CONFIG)
cmd = connection.cursor(dictionary=True)
