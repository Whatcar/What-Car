import io
import os
import random

import cv2
import numpy as np
from ai import detection, label, model
from config import aws_s3
from PIL import Image
from s3_connection import s3_connection
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename


def get_upload_result(data):
    if not data:
        abort(404, "파일이 존재하지 않습니다.")

    # s3 = s3_connection()
    # s3.put_object(
    #     Bucket=aws_s3["BUCKET_NAME"],
    #     Body=data,
    #     Key="upload/" + str(random.random()) + str(secure_filename(data.filename)),
    #     ContentType=data.content_type,
    # )

    # read file
    nparr = np.fromfile(data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # detection car
    box_points = detection.predict(img)
    if box_points is None:
        print("상위 5개중에 차가 없습니다! 어떻게 할까요")
        return {"id": 1}

    # predict car
    predict_value = model.predict(img, box_points)
    label_id = predict_value[0]
    id = int(label.label_dict[label_id])
    print(label.label_dict[label_id], label_id, predict_value[1])

    # visualize car
    boxing_car = model.visualize(img, box_points)
    cv2.imwrite("result.jpg", img)

    img2 = Image.open("result.jpg")
    in_mem_file = io.BytesIO()
    img2.save(in_mem_file, format=img2.format)
    in_mem_file.seek(0)

    rand = str(random.random())
    s3 = s3_connection()
    s3.put_object(
        Bucket=aws_s3["BUCKET_NAME"],
        Body=in_mem_file,
        Key="upload/" + rand + str(secure_filename("result")),
        ContentType=".jpg",
    )
    img_url = f"https://{aws_s3['BUCKET_NAME']}.s3.ap-northeast-2.amazonaws.com/upload/{rand}result"

    os.remove("result.jpg")
    return {"id": id}
