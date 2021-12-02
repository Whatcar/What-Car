from db_connect import db
from flask_restx import fields


# 월드컵
class WorldCup(db.Model):
    __tablename__ = "WORLD_CUP"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(db.Integer, db.ForeignKey("CAR.id"))
    photolink = db.Column(db.Text, nullable=False)
    count = db.Column(db.Integer, nullable=False)

    def __init__(self, car_id, count):
        self.car_id = car_id
        self.photolink = (
            "https://whatcar.s3.ap-northeast-2.amazonaws.com/worldcup_photo/"
            + str(car_id)
            + ".png"
        )
        self.count = count

    def to_dict(self):
        return {"car_id": self.car_id, "photolink": self.photolink}

    wordlcup_model_result = {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디"),
        "name": fields.String(required=True, description="차량 모델명"),
        "count": fields.Integer(required=True, description="우승한 횟수"),
        "rate": fields.Integer(required=True, description="우승 비율"),
        "rank": fields.Integer(required=True, description="순위"),
        "photolink": fields.String(required=True, description="원본 차량 이미지 링크"),
        "is_result": fields.Boolean(required=True, description="현재 우승 결과 여부"),
    }

    worldcup_model_rand_result = {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디"),
        "photolink": fields.String(required=True, description="블러 처리된 차량 이미지 링크"),
    }
