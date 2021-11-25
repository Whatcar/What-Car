import os
from datetime import timedelta

BASE_DIR = os.path.dirname(__file__)

aws_db = {
    "user": "admin",
    "password": "1q2w3e4r!",
    "host": "database-1.cbmthuyhcguk.ap-northeast-2.rds.amazonaws.com",
    "port": "3306",  # Maria DB의 포트
    "database": "whatcar",
}

SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{aws_db['user']}:{aws_db['password']}@{aws_db['host']}:{aws_db['port']}/{aws_db['database']}?charset=utf8"
print(SQLALCHEMY_DATABASE_URI)
SQLALCHEMY_TRACK_MODIFICATIONS = 1
secret_key = "asdasdasdasd"
