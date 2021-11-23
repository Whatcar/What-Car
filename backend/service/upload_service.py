from flask import request
from werkzeug.exceptions import abort


def register():
    data = request.files["file"]
    if not data:
        abort(404, "파일이 존재하지 않습니다.")
    return {"result": "success"}
