from flask import request
from flask_restx import Namespace, Resource, fields
from service.worldcup_service import *

worldcup = Namespace("worldcup", path="/api")

rand_result = worldcup.model(
    "worldcup_rand_result",
    {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디"),
        "photolink": fields.String(required=True, description="블러 처리된 차량 이미지 링크"),
    },
)
result = worldcup.model(
    "worldcup_result",
    {
        "car_id": fields.Integer(required=True, description="차량 고유 아이디"),
        "name": fields.String(required=True, description="차량 모델명"),
        "count": fields.Integer(required=True, description="우승한 횟수"),
        "rate": fields.Integer(required=True, description="우승 비율"),
        "rank": fields.Integer(required=True, description="순위"),
        "photolink": fields.String(required=True, description="원본 차량 이미지 링크"),
        "is_result": fields.Boolean(required=True, description="현재 우승 결과 여부"),
    },
)


@worldcup.route("/select/worldcup")
class Select_Worldcup(Resource):
    @worldcup.response(200, "Success", rand_result)
    def get(self):
        """총 월드컵 후보 중에 랜덤으로 32개를 가져옵니다."""
        car = select_car()

        return car, 200


@worldcup.doc(params={"id": "우승한 차량의 고유 아이디"})
@worldcup.route("/worldcup/result")
class Worldcup_Result(Resource):
    def patch(self):
        """우승한 차량에 해당하는 우승 횟수를 1회 증가합니다."""
        car_id = request.args.get("id", type=int)
        worldcup_result_list = modify_worldcup_result(car_id)
        return worldcup_result_list, 200

    @worldcup.response(200, "Success", result)
    def get(self):
        """해당 차량 이상형 월드컵 결과의 비율과 총 테스트 결과의 순위와 비율을 계산해서 가져옵니다."""

        car_id = request.args.get("id", type=int)
        worldcup_result_list = get_worldcup_result(car_id)
        return worldcup_result_list, 200
