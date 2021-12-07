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

    def __init__(
        self, car_id: int, car_url: str, pred_val: float, nickname: str, password: str
    ):
        self.car_id = car_id
        self.car_url = car_url
        # self.pred_val = pred_val
        self.similarity = pred_val
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
        "pred_val": fields.Float(required=True, description="차량을 예측한 값", example=0.99),
        "nickname": fields.String(required=True, description="닉네임", example="왓카"),
        "password": fields.String(
            required=True, description="패스워드", example="1q2w3e4r!"
        ),
    }

    delete_gallary = {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디", example=1),
        "password": fields.String(
            required=True, description="패스워드", example="1q2w3e4r!"
        ),
    }
    response_model = {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디", example=1),
        "car_url": fields.String(
            required=True,
            description="박스가 그려진 차량 이미지 url",
            example="https://aws.s3.car",
        ),
        "pred_val": fields.Float(required=True, description="차량을 예측한 값", example=0.99),
        "nickname": fields.String(required=True, description="닉네임", example="왓카"),
    }
