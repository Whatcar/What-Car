from flask import Blueprint, jsonify, request
from service.upload_service import register

# from werkzeug.utils import secure_filename

upload_bp = Blueprint("main", __name__, url_prefix="/api")


@upload_bp.route("/upload", methods=["POST"])
def get_register():
    if request.method == "POST":
        data = request.files["file"]

        return jsonify(register(data)), 200
