from flask import request
from flask_restx import Namespace, Resource, fields
from models import Gallary
from service import delete_gallary_cars, get_gallary_cars, post_gallary_cars

gallary = Namespace("gallary", path="/api")

post_gallary = gallary.model(
    "post",
    Gallary.post_gallary,
)
delete_gallary = gallary.model("delete", Gallary.delete_gallary)

nested_model = gallary.model("cars", Gallary.response_model)
response_data = gallary.model(
    "result",
    {
        "cars": fields.List(fields.Nested(nested_model)),
        "result_num": fields.Integer(
            required=True, description="불러온 차량의 개수", example=1
        ),
    },
)


@gallary.route("/gallary")
class Gallary(Resource):
    @gallary.doc(params={"offset": "데이터 시작 위치", "limit": "가져올 데이터의 수"})
    @gallary.response(200, "Success", response_data)
    def get(self):
        """갤러리에 있는 차량들을 가져옵니다."""
        offset = request.args.get("offset")
        limit = request.args.get("limit")
        return get_gallary_cars(offset, limit)

    @gallary.expect(post_gallary)
    @gallary.response(201, "Created")
    @gallary.response(400, "Failed")
    def post(self):
        """갤러리에 차량을 추가합니다."""
        info = request.json
        return post_gallary_cars(info), 201

    @gallary.expect(delete_gallary)
    @gallary.response(204, "Deleted")
    @gallary.response(409, "Not Correct PW")
    @gallary.response(400, "Failed")
    def delete(self):
        """갤러리에 차량을 삭제합니다."""
        info = request.json
        return delete_gallary_cars(info), 204
