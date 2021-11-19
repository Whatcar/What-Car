import config
from flask import Blueprint, json, jsonify, request
from models import *
from sqlalchemy import create_engine
from werkzeug.exceptions import abort

bp = Blueprint("search", __name__, url_prefix="/api")
# engine = create_engine(config.SQLALCHEMY_DATABASE_URI)


@bp.route("/search", methods=["POST"])
def search():
    if request.method == "POST":
        data = request.json
        if not data:
            abort(404, "조건을 선택해주세요.")
        brand = data["brand"]
        cost = data["cost"]
        displacement = data["displacement"]
        fuelEfficiency = data["fuelEfficiency"]
        grade = data["grade"]
        shape = data["shape"]
        name = data["name"]
        method = data["method"]
        fuel = data["fuel"]

        return jsonify({"result": "success"})
