from flask import Blueprint, json, jsonify, request
from models import *
from werkzeug.exceptions import abort

bp = Blueprint("detail", __name__,url_prefix="/api")

@bp.route("/detail", methods=["GET"])
def detail():
    if request.method == "GET":
        pass
