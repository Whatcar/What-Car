from flask import request
from flask_restx import Namespace, Resource
from service.upload_service import register
from werkzeug.datastructures import FileStorage

# from werkzeug.utils import secure_filename

upload = Namespace("main", path="/api")

parser = upload.parser()
parser.add_argument("file", type=FileStorage, location="files")


@upload.expect(parser)
@upload.route("/upload", methods=["POST"])
class Upload(Resource):
    def post(self):
        """차량 사진을 올리면 가장 유사한 차량을 가져옵니다."""
        data = request.files["file"]
        # data = request.files["file"]
        return register(data), 200
