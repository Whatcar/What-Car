from config import aws_s3
from db_connect import db
from flask_restx import fields


# 월드컵
class WorldCup(db.Model):
    __tablename__ = "world_cup"
    car_id = db.Column(
        db.Integer, db.ForeignKey("car.id"), primary_key=True, nullable=False
    )
    photolink = db.Column(db.Text, nullable=False)
    count = db.Column(db.Integer, nullable=False)

    def __init__(self, car_id, count):
        self.car_id = car_id
        self.photolink = (
            f"https://{aws_s3['BUCKET_NAME']}.s3.ap-northeast-2.amazonaws.com/worldcup_image/"
            + str(car_id)
            + ".png"
        )
        self.count = count

    def to_dict(self):
        return {"car_id": self.car_id, "photolink": self.photolink}

    response_model = {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디"),
        "name": fields.String(required=True, description="차량 모델명"),
        "count": fields.Integer(required=True, description="우승한 횟수"),
        "rate": fields.Integer(required=True, description="우승 비율"),
        "rank": fields.Integer(required=True, description="순위"),
        "photolink": fields.String(required=True, description="원본 차량 이미지 링크"),
        "is_result": fields.Boolean(required=True, description="현재 우승 결과 여부"),
    }

    response_model_rand = {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디"),
        "photolink": fields.String(required=True, description="블러 처리된 차량 이미지 링크"),
    }
