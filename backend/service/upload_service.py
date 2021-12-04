import os
import random

from ai import label, model
from config import aws_s3
from flask import request
from s3_connection import s3_connection
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename


def register(data):
    if not data:
        abort(404, "파일이 존재하지 않습니다.")
    folder_name = "./static/image/"

    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
    file_location = folder_name + str(data.filename)
    data.save(file_location)

    # s3 = s3_connection()
    # s3.put_object(
    #     Bucket=aws_s3["BUCKET_NAME"],
    #     Body=data,
    #     Key="upload/" + str(random.random()) + str(secure_filename(data.filename)),
    #     ContentType=data.content_type,
    # )
    print(file_location)
    predict_value = model.predict(file_location)
    label_id = predict_value[0]
    id = int(label.label_dict[label_id])
    print(label.label_dict[label_id], label_id, predict_value[1])
    os.remove(file_location)

    return {"id": id}
