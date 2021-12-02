from flask import request
from flask_restx import Namespace, Resource, fields
from service.detail_service import get_detail

# detail_bp = Blueprint("detail", __name__, url_prefix="/api")
detail = Namespace("detail", path="/api")

result = detail.model(
    "detail_result",
    {
        "id": fields.Integer(description="차량 고유 아이디"),
        "name": fields.String(description="모델명"),
        "photolink": fields.String(description="이미지"),
        "brand": fields.String(description="브랜드"),
        "imported_domestic": fields.String(description="수입/국산"),
        "price": fields.String(description="가격"),
        "fuel_efficiency": fields.String(description="연비"),
        "fuel": fields.String(description="연료"),
        "car_grade": fields.String(description="차급"),
        "appearance": fields.String(description="외형"),
        "grade_name": fields.String(description="등급명"),
        "on_sale": fields.String(description="판매여부"),
        "release_date": fields.String(description="출시일"),
        "discontinued_date": fields.String(description="단종일"),
        "ride_capacity": fields.String(description="승차정원"),
        "top_speed": fields.String(description="최고속도"),
        "displacement": fields.String(description="배기량"),
        "engine_type": fields.String(description="엔진형식"),
        "drive_method": fields.String(description="구동방식"),
        "fuel_efficiency_rating": fields.String(description="연비등급"),
    },
)


@detail.doc(params={"id": "차량의 고유 아이디"})
@detail.route("/detail")
class Detail(Resource):
    @detail.response(200, "Success", result)
    def get(self):
        """해당 차량의 상세 스펙을 가져옵니다."""

        id = request.args.get("id")
        car_content = get_detail(id)
        print(car_content)
        return car_content, 200
