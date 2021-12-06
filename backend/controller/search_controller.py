import config
from flask import request
from flask_restx import Namespace, Resource
from models import Car
from service import get_search_results

search = Namespace("search", path="/api")

result = search.model(
    "serach_result",
    Car.response_model_part,
)


@search.doc(
    params={
        "brand": "브랜드",
        "cost": "가격",
        "displacement": "배기량",
        "fuelEfficiency": "연비",
        "grade": "차급",
        "shape": "외형",
        "name": "모델명",
        "method": "구동방식",
        "fuel": "연료",
        "num": "페이지 번호",
        "sort_criteria": "정렬기준",
    }
)
@search.route("/search")
class Search(Resource):
    @search.response(200, "Success", result)
    @search.response(404, "페이지 범위를 초과했습니다.")
    def get(self):
        """검색 결과를 가져옵니다."""

        brand = request.args.get("brand")
        cost = request.args.get("cost")
        displacement = request.args.get("displacement")
        fuelEfficiency = request.args.get("fuelEfficiency")
        grade = request.args.get("grade")
        shape = request.args.get("shape")
        name = request.args.get("name")
        method = request.args.get("method")
        fuel = request.args.get("fuel")
        num = request.args.get("num", type=int, default=1)
        sort_criteria = request.args.get("sort_criteria", type=str)
        cars = get_search_results(
            brand=brand,
            cost=cost,
            displacement=displacement,
            fuelEfficiency=fuelEfficiency,
            grade=grade,
            shape=shape,
            name=name,
            method=method,
            fuel=fuel,
            num=num,
            sort_criteria=sort_criteria,
        )
        return cars, 200
