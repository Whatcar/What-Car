from flask import request
from flask_restx import Namespace, Resource, fields
from models import Gallery
from service import delete_gallery_cars, get_gallery_cars, post_gallery_cars

gallery = Namespace("gallery", path="/api")

post_gallery = gallery.model(
    "post",
    Gallery.post_gallery,
)
delete_gallery = gallery.model("delete", Gallery.delete_gallery)

nested_model = gallery.model("cars", Gallery.response_model)
response_data = gallery.model(
    "result",
    {
        "cars": fields.List(fields.Nested(nested_model)),
        "result_num": fields.Integer(
            required=True, description="불러온 차량의 개수", example=1
        ),
    },
)


@gallery.route("/gallery")
class Gallery(Resource):
    @gallery.doc(params={"offset": "데이터 시작 위치", "limit": "가져올 데이터의 수"})
    @gallery.response(200, "Success", response_data)
    def get(self):
        """갤러리에 있는 차량들을 가져옵니다."""
        offset = request.args.get("offset")
        limit = request.args.get("limit")
        return get_gallery_cars(offset, limit)

    @gallery.expect(post_gallery)
    @gallery.response(201, "Created")
    @gallery.response(400, "Failed")
    def post(self):
        """갤러리에 차량을 추가합니다."""
        info = request.json
        return post_gallery_cars(info), 201

    @gallery.expect(delete_gallery)
    @gallery.response(204, "Deleted")
    @gallery.response(409, "Not Correct PW")
    @gallery.response(400, "Failed")
    def delete(self):
        """갤러리에 차량을 삭제합니다."""
        info = request.json
        return delete_gallery_cars(info), 204
