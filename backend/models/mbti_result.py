from db_connect import db


# Mbti 결과 정보
class Mbti_result(db.Model):
    __tablename__ = "mbti_result"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    type = db.Column(db.String(30), nullable=False, unique=True)
    count = db.Column(db.Integer, nullable=False)
