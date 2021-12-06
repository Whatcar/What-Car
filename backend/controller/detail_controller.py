from flask import request
from flask_restx import Namespace, Resource
from models import Car
from service import get_detail, get_same_id_gallery_img

detail = Namespace("detail", path="/api")

result = detail.model(
    "detail_result",
    Car.response_model,
)


@detail.doc(params={"id": "차량의 고유 아이디"})
@detail.route("/detail")
class Detail(Resource):
    @detail.response(200, "Success", result)
    def get(self):
        """해당 차량의 상세 스펙을 가져옵니다."""

        id = request.args.get("id")
        car_content = get_detail(id)

        return car_content, 200


@detail.route("/detail/gallery", methods=["GET"])
class detail_Gallery(Resource):
    @detail.doc(params={"id": "차량의 고유 아이디", "num": "페이지 번호"})
    @detail.response(200, "Success", result)
    @detail.response(404, "페이지 범위를 초과했습니다.")
    def get(self):
        """해당 자동차 분석 결과의 가장 유사 차량과 동일한 차량 갤러리 상세 정보를 가져옵니다."""
        id = request.args.get("id")
        num = request.args.get("num", type=int, default=1)
        same_gallery_content = get_same_id_gallery_img(id, num)

        return same_gallery_content
