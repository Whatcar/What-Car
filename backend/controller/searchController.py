import config
from flask import Blueprint, jsonify
from sqlalchemy import create_engine
from service.search_service import car_list, search, car_list_sorted

search_bp = Blueprint("search", __name__, url_prefix="/api")
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)


@search_bp.route("/car/list/<int:num>", methods=["GET"])
def get_car_List(num):
    car = car_list(num)
    return jsonify(car), 200


@search_bp.route(
    "/search/<string:brand>/<string:cost>/<string:displacement>/<string:fuelEfficieny>/<string:grade>/<string:shape>/<string:name>/<string:method>/<string:fuel>/<int:num>",
    methods=["GET"],
)
def get_search(
    brand, cost, displacement, fuelEfficiency, grade, shape, name, method, fuel, num
):
    car = search(
        brand, cost, displacement, fuelEfficiency, grade, shape, name, method, fuel, num
    )
    return jsonify(car), 200


@search_bp.route("/car/list/sorted/<string:sort_criteria>/<int:num>", methods=["GET"])
def get_car_list_sorted(sort_criteria, num):
    car = car_list_sorted(sort_criteria, num)
    return jsonify(car), 200


