from flask import request
from flask_restx import Namespace, Resource
from models import MbtiResult
from service import get_mbti_result

mbti = Namespace("mbti", path="/api")

# /mbti/result PATCH Response Body
result = mbti.model(
    "mbti_result",
    MbtiResult.response_model,
)


@mbti.doc(params={"mbti": "테스트 결과인 mbti 타입"})
@mbti.route("/mbti/result")
class Mbti(Resource):
    @mbti.response(200, "Success", result)
    @mbti.response(404, "MBTI 타입 중에 해당하는 타입이 없습니다.")
    def patch(self):
        """해당 Mbti 테스트 결과 타입의 비율과 총 테스트 결과의 순위와 비율을 계산해서 가져옵니다."""
        mbti = request.args.get("mbti")
        mbti_result_list = get_mbti_result(mbti)
        return mbti_result_list, 200
