from flask import request
from werkzeug.exceptions import abort


def register():
    # if not data:
    #     abort(404, "파일이 존재하지 않습니다.")
    id = 1

    return {"id": id}
