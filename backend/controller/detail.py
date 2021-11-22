from flask import Blueprint, json, jsonify, request
from models import *
from werkzeug.exceptions import abort

bp = Blueprint("detail", __name__, url_prefix="/api")


@bp.route("/detail/<int:id>", methods=["GET"])
def detail(id):
    if request.method == "GET":
        car = Car.query.filter(Car.id == id).first()
        car_content = Car.to_dict(car)

        return jsonify(car_content)
