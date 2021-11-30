from flask import Blueprint, jsonify, request
from service.worldcup_service import select_car, worldcup_result

worldcup_bp = Blueprint("worldcup", __name__, url_prefix="/api")


@worldcup_bp.route("/select/worldcup", methods=["GET"])
def select_car_List():
    if request.method == "GET":
        car = select_car()

        return jsonify(car), 200


@worldcup_bp.route(
    "/worldcup/result",
    methods=["PATCH"],
)
def get_worldcup_result():
    if request.method == "PATCH":
        car_id = request.args.get("id", type=int)
        worldcup_result_list = worldcup_result(car_id)

        return jsonify(worldcup_result_list), 200
