from flask import Blueprint, jsonify, request
from service.mbti_service import mbti_result

mbti_bp = Blueprint("mbti", __name__, url_prefix="/api")


@mbti_bp.route("/mbti/result", methods=["PATCH"])
def get_mbti_result():
    if request.method == "PATCH":
        mbti = request.args.get("mbti")
        mbti_result_list = mbti_result(mbti)

        return jsonify(mbti_result_list), 200
