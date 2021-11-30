from flask import Blueprint, jsonify, request
from service.worldcup_service import *

worldcup_bp = Blueprint("worldcup", __name__, url_prefix="/api")


@worldcup_bp.route("/select/worldcup", methods=["GET"])
def select_car_List():
    if request.method == "GET":
        car = select_car()

        return jsonify(car), 200


@worldcup_bp.route(
    "/worldcup/result",
    methods=["PATCH", "GET"],
)
def worldcup_result():
    car_id = request.args.get("id", type=int)

    if request.method == "PATCH":
        worldcup_result_list = modify_worldcup_result(car_id)

    if request.method == "GET":
        worldcup_result_list = get_worldcup_result(car_id)

    return jsonify(worldcup_result_list), 200
