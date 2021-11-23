from flask import Blueprint, jsonify
from service.detail_service import detail

detail_bp = Blueprint("detail", __name__, url_prefix="/api")


@detail_bp.route("/detail/<int:id>", methods=["GET"])
def get_detail(id):
    car_content = detail(id)
    return jsonify(car_content), 200
