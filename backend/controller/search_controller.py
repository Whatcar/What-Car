import config
from flask import Blueprint, jsonify, request
from service.search_service import search
from sqlalchemy import create_engine

search_bp = Blueprint("search", __name__, url_prefix="/api")
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)


@search_bp.route("/search", methods=["GET"])
def get_search():
    if request.method == "GET":
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

        car = search(
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

        return jsonify(car), 200
