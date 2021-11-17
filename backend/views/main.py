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
        file_location = (
            "./static/image/"
            + str(random.random())
            + str(secure_filename(data.filename))
        )
        data.save(file_location)

        return jsonify({"result": "success"})
