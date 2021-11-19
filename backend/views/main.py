import random

from flask import Blueprint, json, jsonify, request
from models import *
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename

bp = Blueprint("main", __name__, url_prefix="/api")


@bp.route("/upload", methods=["POST"])
def register():
    if request.method == "POST":
        data = request.files["file"]
        if not data:
            abort(404, "파일이 존재하지 않습니다.")
        

        return jsonify({"result": "success"})
