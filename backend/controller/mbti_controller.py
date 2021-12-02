from flask import request
from flask_restx import Namespace, Resource, fields
from service.mbti_service import mbti_result

mbti = Namespace("mbti", path="/api")

result = mbti.model(
    "mbti_result",
    {
        "type": fields.String(required=True, description="Mbti 타입"),
        "count": fields.Integer(required=True, description="총 테스트 중 해당 타입 횟수"),
        "rate": fields.Integer(required=True, description="총 테스트 중 해당 타입 결과 비율"),
        "rank": fields.Integer(required=True, description="순위"),
        "is_result": fields.String(required=True, description="현재 테스트 결과 여부"),
    },
)


@mbti.doc(params={"mbti": "테스트 결과인 mbti 타입"})
@mbti.route("/mbti/result")
class Mbti(Resource):
    @mbti.response(200, "Success", result)
    def patch(self):
        """해당 Mbti 테스트 결과 타입의 비율과 총 테스트 결과의 순위와 비율을 계산해서 가져옵니다."""
        mbti = request.args.get("mbti")
        mbti_result_list = mbti_result(mbti)
        return mbti_result_list, 200
