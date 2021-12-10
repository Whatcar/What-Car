from db_connect import db
from flask_restx import fields


# Mbti 결과 정보
class MbtiResult(db.Model):
    __tablename__ = "mbti_result"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    type = db.Column(db.String(30), nullable=False, unique=True)
    count = db.Column(db.Integer, nullable=False)

    response_model = {
        "type": fields.String(required=True, description="Mbti 타입"),
        "count": fields.Integer(required=True, description="총 테스트 중 해당 타입 횟수"),
        "rate": fields.Integer(required=True, description="총 테스트 중 해당 타입 결과 비율"),
        "rank": fields.Integer(required=True, description="순위"),
        "is_result": fields.String(required=True, description="현재 테스트 결과 여부"),
    }
