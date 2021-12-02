import config
from flask import request
from flask_restx import Namespace, Resource, fields
from service.search_service import get_search
from sqlalchemy import create_engine

search = Namespace("search", path="/api")
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)

result = search.model(
    "serach_result",
    {
        "id": fields.String(required=True, description="차량 고유 아이디"),
        "name": fields.String(required=True, description="차량 모델명"),
        "photolink": fields.String(required=True, description="차량 이미지 링크"),
        "price": fields.String(required=True, description="차량 가격"),
        "car_grade": fields.String(required=True, description="차급"),
    },
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
        car = get_search(
            brand,
            cost,
            displacement,
            fuelEfficiency,
            grade,
            shape,
            name,
            method,
            fuel,
            num,
            sort_criteria,
        )
        return car, 200
