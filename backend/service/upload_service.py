import random

from config import aws_s3
from flask import request
from s3_connection import s3_connection
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename


def register(data):
    if not data:
        abort(404, "파일이 존재하지 않습니다.")
    s3 = s3_connection()
    s3.put_object(
        Bucket=aws_s3["BUCKET_NAME"],
        Body=data,
        Key="upload/" + str(random.random()) + str(secure_filename(data.filename)),
        ContentType=data.content_type,
    )
    id = 1

    return {"id": id}
