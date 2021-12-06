from flask import request
from flask_restx import Namespace, Resource
from models import WorldCup
from service import get_random_cars, get_worldcup_result, modify_worldcup_result

worldcup = Namespace("worldcup", path="/api")

rand_result = worldcup.model(
    "worldcup_rand_result",
    WorldCup.response_model_rand,
)
result = worldcup.model(
    "worldcup_result",
    WorldCup.response_model,
)


@worldcup.route("/select/random/cars")
class Select_Random_Cars(Resource):
    @worldcup.response(200, "Success", rand_result)
    def get(self):
        """총 월드컵 후보 중에 랜덤으로 32개를 가져옵니다."""
        cars = get_random_cars()

        return cars, 200


@worldcup.doc(params={"id": "우승한 차량의 고유 아이디"})
@worldcup.route("/worldcup/result")
class Worldcup_Result(Resource):
    @worldcup.response(200, "Success")
    @worldcup.response(404, "후보에 해당하는 차량이 없습니다.")
    def patch(self):
        """우승한 차량에 해당하는 우승 횟수를 1회 증가합니다."""
        car_id = request.args.get("id", type=int)
        success = modify_worldcup_result(car_id)

        return success, 200

    @worldcup.response(200, "Success", result)
    @worldcup.response(404, "후보에 해당하는 차량이 없습니다.")
    def get(self):
        """해당 차량 이상형 월드컵 결과의 비율과 총 테스트 결과의 순위와 비율을 계산해서 가져옵니다."""
        car_id = request.args.get("id", type=int)
        worldcup_result_list = get_worldcup_result(car_id)

        return worldcup_result_list, 200
