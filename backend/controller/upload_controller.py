from flask import request
from flask_restx import Namespace, Resource, fields
from service.upload_service import register
from werkzeug.datastructures import FileStorage

upload = Namespace("upload", path="/api")

parser = upload.parser()
parser.add_argument("file", type=FileStorage, location="files")
result = upload.model(
    "upload_result", {"id": fields.String(required=True, description="차량 고유 아이디")}
)


@upload.expect(parser)
@upload.route("/upload", methods=["POST"])
class Upload(Resource):
    @upload.response(200, "Success", result)
    @upload.response(404, "파일이 존재하지 않습니다.")
    def post(self):
        """차량 사진을 올리면 가장 유사한 차량을 가져옵니다."""
        data = request.files["file"]
        # data = request.files["file"]
        return register(data), 200
