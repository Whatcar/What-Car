import bcrypt
from db_connect import db
from flask_restx import fields


# 갤러리 정보
class Gallery(db.Model):
    __tablename__ = "gallery"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(db.Integer, db.ForeignKey("car.id"), nullable=False)
    similarity = db.Column(db.Text, nullable=True)
    car_url = db.Column(db.Text, nullable=True)
    nickname = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(50), nullable=False)

    def __init__(self, nickname: str, password: str):
        self.nickname = nickname
        self.password = bcrypt.generate_password_hash(password)

    def is_password_correct(self, password: str):
        return bcrypt.check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "car_id": self.car_id,
            "similarity": self.similarity,
            "car_url": self.car_url,
            "nickname": self.nickname,
        }

    response_model = {
        "result_num": fields.Integer(required=True, description="고유 아이디 일치 갤러리 게시물 개수"),
        "car_id": fields.Integer(required=True, description="차량 고유 아이디"),
        "similarity": fields.Float(required=True, description="차량 분석 유사도"),
        "car_url": fields.String(required=True, description="차량 분석 이미지 링크"),
        "nickname": fields.String(required=True, description="업로드한 사용자의 닉네임"),
    }
