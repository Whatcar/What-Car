from flask import request
from flask_restx import Namespace, Resource, fields
<<<<<<< HEAD
=======
from models import Car
>>>>>>> 4f03b5252642a01853c98ad536ab6d33b3a37953
from service import get_ai_cars_detail, get_upload_result
from werkzeug.datastructures import FileStorage

upload = Namespace("upload", path="/api")

parser = upload.parser()
parser.add_argument("file", type=FileStorage, location="files")
result = upload.model(
    "post_upload_result", {"id": fields.String(required=True, description="차량 고유 아이디")}
)
get_result = upload.model("get_upload_result", Car.response_model_upload)


@upload.route("/upload")
class Upload(Resource):
    @upload.doc(params={"id": "차량의 임시 DB 고유 아이디"})
    @upload.response(200, "Success", get_result)
    @upload.response(404, "해당 url이 만료되었습니다.")
    def get(self):
        """해당 자동차 분석 결과의 고유한 DB id값의 상세 정보를 가져옵니다."""
        id = request.args.get("id")
        ai_cars_content = get_ai_cars_detail(id)

        return ai_cars_content

    @upload.expect(parser)
    @upload.response(200, "Success", result)
    @upload.response(404, "파일이 존재하지 않습니다.")
    def post(self):
        """차량 사진을 올리면 해당 자동차 분석 결과의 고유한 DB id값을 가져옵니다."""
        data = request.files["file"]
        similarity_car_db_id = get_upload_result(data)

        return similarity_car_db_id, 200


# @upload.route("/upload/gallery", methods=["GET"])
# class Upload_Gallery(Resource):
#     @upload.doc(params={"id": "차량의 고유 아이디"})
#     @upload.response(200, "Success", result)
#     @upload.response(404, "해당 url이 만료되었습니다.")
#     def get(self):
#         """해당 자동차 분석 결과의 가장 유사 차량과 동일한 차량 갤러리 상세 정보를 가져옵니다."""
#         id = request.args.get("id")
#         num = request.args.get("num", type=int, default=1)
#         same_gallery_content = get_same_id_gallery_img(id, num)

#         return same_gallery_content
