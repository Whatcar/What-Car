from flask import Blueprint, jsonify, request
from service.detail_service import detail

detail_bp = Blueprint("detail", __name__, url_prefix="/api")


@detail_bp.route("/detail", methods=["GET"])
def get_detail():
    if request.method == "GET":
        id = request.args.get("id")
        car_content = detail(id)

        return jsonify(car_content), 200
