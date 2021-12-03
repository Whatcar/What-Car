from flask import request
from flask_restx import Namespace, Resource
from models.car import Car
from service.detail_service import get_detail

detail = Namespace("detail", path="/api")

result = detail.model(
    "detail_result",
    Car.car_model,
)


@detail.doc(params={"id": "차량의 고유 아이디"})
@detail.route("/detail")
class Detail(Resource):
    @detail.response(200, "Success", result)
    def get(self):
        """해당 차량의 상세 스펙을 가져옵니다."""

        id = request.args.get("id")
        car_content = get_detail(id)
        print(car_content)
        return car_content, 200