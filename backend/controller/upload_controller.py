from flask import request
from flask_restx import Namespace, Resource, fields
from models import Car, CarColor
from service import get_ai_cars_detail, get_upload_result
from werkzeug.datastructures import FileStorage

upload = Namespace("upload", path="/api")

parser = upload.parser()
parser.add_argument("file", type=FileStorage, location="files")

# /upload, POST Response Body
post_upload_model = upload.model(
    "post_upload_result",
    {
        "id": fields.String(required=True, description="차량 고유 아이디", example=2),
        "ai_result_id": fields.Integer(
            required=True, description="AI DB 고유 아이디", example=1
        ),
    },
)

# /upload, GET Response Body
upload_most_nested_model = upload.model(
    "upload_most_car_nested_result",
    Car.response_model_upload,
)
upload_color_nested_model = upload.model("detail_color_nested", CarColor.response_model)
upload_less_nested_model = upload.model(
    "less_cars_result", Car.response_model_upload_less
)
upload_most_model = upload.model(
    "most_car_result",
    {
        "similarity": fields.Float(
            required=True, description="차량 분석 유사도", example=0.99
        ),
        "is_upload": fields.Boolean(
            required=True, description="갤러리 업로드 여부", example="true"
        ),
        "car_url": fields.String(
            required=True,
            description="차량 분석 이미지 링크",
            example="https://aws.s3.car",
        ),
        "most_car_detail": fields.List(fields.Nested(upload_most_nested_model)),
        "most_car_color": fields.List(fields.Nested(upload_color_nested_model)),
    },
)
get_upload_model = upload.model(
    "get_upload_result",
    {
        "ai_result_id": fields.Integer(description="AI DB 고유 아이디", example=1),
        "most_car": fields.List(fields.Nested(upload_most_model)),
        "less_cars": fields.List(fields.Nested(upload_less_nested_model)),
    },
)


@upload.route("/upload")
class Upload(Resource):
    @upload.doc(params={"id": "AI DB 고유 아이디"})
    @upload.response(200, "Success", get_upload_model)
    @upload.response(404, "해당 url이 만료되었습니다.")
    def get(self):
        """해당 자동차 분석 결과의 고유한 DB id값의 상세 정보를 가져옵니다."""
        id = request.args.get("id")
        ai_cars_content = get_ai_cars_detail(id)

        return ai_cars_content

    @upload.expect(parser)
    @upload.response(200, "Success", post_upload_model)
    @upload.response(404, "파일이 존재하지 않습니다.")
    def post(self):
        """차량 사진을 올리면 해당 자동차 분석 결과의 고유한 DB id값을 가져옵니다."""
        data = request.files["file"]
        similarity_car_db_id = get_upload_result(data)

        return similarity_car_db_id, 200
