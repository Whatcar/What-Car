from datetime import datetime

from bcrypt_generator import bcrypt
from db_connect import db
from flask_restx import fields


# 갤러리
class Gallary(db.Model):
    __tablename__ = "gallary"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(db.Integer, db.ForeignKey("car.id"), nullable=False)
    similarity = db.Column(db.Float, nullable=True)
    car_url = db.Column(db.Text, nullable=True)
    nickname = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def __init__(
        self, car_id: int, car_url: str, similarity: float, nickname: str, password: str
    ):
        self.car_id = car_id
        self.car_url = car_url
        self.similarity = similarity
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

    post_gallary = {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디", example=1),
        "car_url": fields.String(
            required=True,
            description="박스가 그려진 차량 이미지 url",
            example="https://aws.s3.car",
        ),
        "similarity": fields.Float(
            required=True, description="차량 분석 유사도", example=0.99
        ),
        "nickname": fields.String(
            required=True, description="업로드한 사용자의 닉네임", example="왓카"
        ),
        "password": fields.String(
            required=True, description="패스워드", example="1q2w3e4r!"
        ),
    }

    delete_gallary = {
        "gallary_id": fields.Integer(required=True, description="갤러리 아이디", example=1),
        "password": fields.String(
            required=True, description="패스워드", example="1q2w3e4r!"
        ),
    }
    response_model = {
        "result_num": fields.Integer(
            required=True, description="고유 아이디 일치 갤러리 게시물 개수", example=1
        ),
        "car_name": fields.String(
            required=True, description="차량 이름", example="2021 벤츠"
        ),
        "car_url": fields.String(
            required=True,
            description="차량 분석 이미지 링크",
            example="https://aws.s3.car",
        ),
        "similarity": fields.Float(
            required=True, description="차량 분석 유사도", example=0.99
        ),
        "nickname": fields.String(
            required=True, description="업로드한 사용자의 닉네임", example="왓카"
        ),
    }
