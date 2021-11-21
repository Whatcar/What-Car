import os
from datetime import timedelta

BASE_DIR = os.path.dirname(__file__)

SQLALCHEMY_DATABASE_URI = (
    "mysql+pymysql://root:root1234@127.0.0.1:3306/whatcar?charset=utf8mb4"
)
SQLALCHEMY_TRACK_MODIFICATIONS = 1
secret_key = "asdasdasdasd"
