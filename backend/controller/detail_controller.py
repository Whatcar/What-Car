from flask import request
from flask_restx import Namespace, Resource, fields
from models import Car, CarColor, Gallery
from service import get_detail, get_same_id_gallery_img

detail = Namespace("detail", path="/api")

# /detail Response Body
detail_nested_model = detail.model(
    "nested_detail_result",
    Car.response_model,
)
detail_color_nested_model = detail.model("detail_color_nested", CarColor.response_model)
detail_model = detail.model(
    "detail_result",
    {
        "detail": fields.List(fields.Nested(detail_nested_model)),
        "color": fields.List(fields.Nested(detail_color_nested_model)),
    },
)

# /detail/gallery Response Body
detail_gallery_nested_model = detail.model(
    "detail_gallery_nested_result", Gallery.detail_gallery
)
detail_gallery_model = detail.model(
    "detail_gallery_result",
    {
        "car_name": fields.String(
            required=True, description="차량 이름", example="2021 벤츠"
        ),
        "gallery_contents": fields.List(fields.Nested(detail_gallery_nested_model)),
    },
)


@detail.doc(params={"id": "차량의 고유 아이디"})
@detail.route("/detail")
class Detail(Resource):
    @detail.response(200, "Success", detail_model)
    def get(self):
        """해당 차량의 상세 스펙을 가져옵니다."""

        id = request.args.get("id")
        car_content = get_detail(id)

        return car_content, 200


@detail.route("/detail/gallery")
class detail_gallery(Resource):
    @detail.doc(
        params={"ai_result_id": "AI 분석 결과 페이지 id", "id": "차량의 고유 아이디", "num": "페이지 번호"}
    )
    @detail.response(200, "Success", detail_gallery_model)
    @detail.response(404, "페이지 범위를 초과했습니다.")
    def get(self):
        """해당 자동차 분석 결과의 가장 유사 차량과 동일한 차량 갤러리 상세 정보를 가져옵니다."""

        id = request.args.get("id")
        ai_result_id = request.args.get("ai_result_id")

        same_gallery_content = get_same_id_gallery_img(id, ai_result_id)

        return same_gallery_content
