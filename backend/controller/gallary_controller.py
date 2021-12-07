from flask import request
from flask_restx import Namespace, Resource, fields
from models import Gallary
from service import delete_gallary_cars, get_gallary_cars, post_gallary_cars

gallary = Namespace("gallary", path="/api")

post_gallary = gallary.model(
    "data",
    Gallary.post_gallary,
)
delete_gallary = gallary.model("data", Gallary.delete_gallary)

nested_model = gallary.model("cars", Gallary.response_model)
response_data = gallary.model(
    "result",
    {"cars": fields.List(fields.Nested(nested_model))},
)


@gallary.route("/gallary")
class Gallary(Resource):
    @gallary.doc(params={"car_id": "특정한 car id"})
    @gallary.response(200, "Success", response_data)
    def get(self):
        """갤러리에 있는 차량들을 가져옵니다."""
        car_id = request.args.get("car_id")

        return get_gallary_cars(car_id)

    @gallary.expect(post_gallary)
    @gallary.response(201, "Success")
    @gallary.response(400, "Failed")
    def post(self):
        """갤러리에 차량을 추가합니다."""
        info = request.json
        return post_gallary_cars(info)

    @gallary.expect(delete_gallary)
    @gallary.response(201, "Success")
    @gallary.response(409, "No Galary ID")
    @gallary.response(400, "Failed")
    def delete(self):
        """갤러리에 차량을 삭제합니다."""
        info = request.json
        return delete_gallary_cars(info)
