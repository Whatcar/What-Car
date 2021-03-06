import datetime
import io
import random
import time

import cv2
import numpy as np
import requests
from ai import detection, label, model
from config import aws_s3
from models import Ai_Result, Car, CarColor, db
from PIL import Image
from s3_connection import s3_connection
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename


def get_upload_result(data):
    if not data:
        abort(404, "파일이 존재하지 않습니다.")

    # read file
    nparr = np.fromfile(data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # detection car
    box_points = detection.predict(img)
    if box_points is None:
        return abort(409, "차가 존재하지 않습니다.")

    # predict car
    predict_value = model.predict(img, box_points)
    # 현재 데이터가 없는 차량들이라면 예외처리
    if label.label_dict[predict_value[0][0]] == 1:
        abort(403, "현재 데이터가 존재하지 않습니다. 추후에 추가예정입니다.")

    # similiar cars
    result = []
    for label_id, val in predict_value:
        car_id = label.label_dict[label_id]
        result.append((car_id, val))
    label_id = predict_value[0][0]

    # visualize car
    boxing_car = model.visualize(img, box_points)
    img_to_jpg = Image.fromarray(cv2.cvtColor(boxing_car, cv2.COLOR_BGR2RGB))

    in_mem_file = io.BytesIO()
    img_to_jpg.save(in_mem_file, format="JPEG")
    in_mem_file.seek(0)

    rand = str(random.random())
    now = datetime.datetime.now()
    s3 = s3_connection()
    s3.put_object(
        Bucket=aws_s3["BUCKET_NAME"],
        Body=in_mem_file,
        Key="upload/" + str(now) + rand + str(secure_filename("result")),
        ContentType=".jpg",
    )

    img_url = f"https://{aws_s3['BUCKET_NAME']}.s3.{aws_s3['REGION']}.amazonaws.com/upload/{now}{rand}result"

    less_similar_cars = str(
        [(result[i][0], result[i][1]) for i in range(1, len(result))]
    )

    temp_data = Ai_Result(
        car_id=result[0][0],
        similarity=result[0][1],
        less_similar_cars=less_similar_cars,
        most_similar_car_url=img_url,
        created_at=now,
    )
    db.session.add(temp_data)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort(400, {"error": str(e)})

    id = Ai_Result.query.filter(Ai_Result.most_similar_car_url == img_url).first().id

    return {"id": id, "car_id": result[0][0]}


def get_ai_cars_detail(id):
    data = Ai_Result.query.filter(Ai_Result.id == id).first()

    if data == None:
        abort(404, "해당 url이 만료되었습니다.")

    url = data.most_similar_car_url
    # S3 url 만료되었는지 확인
    try:
        response = requests.get(url)
    except Exception as e:
        time.sleep(0.5)
        response = requests.get(url)

    # 만료되면
    if response.status_code == 403 or response.status_code == 404:
        # 해당 db에서도 삭제
        db.session.delete(data)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(400, {"error": str(e)})

        abort(404, "해당 url이 만료되었습니다.")

    # 이미지가 있으면
    if response.status_code == 200:
        content = Ai_Result.to_dict(data)

        most_similar_car = Car.query.filter(Car.id == data.car_id).first()
        most_similar_car_content = Car.to_dict(most_similar_car)
        most_similar_car_color = CarColor.query.filter(
            CarColor.car_id == data.car_id
        ).first()

        less = content["less_similar_cars"]
        less_similar_car_content_list = []
        most_similar_car_color_content = CarColor.to_dict(most_similar_car_color)

        for i in range(0, 4):
            less_similar_car = Car.query.filter(Car.id == less[i][0]).first()
            less_similar_car_content = Car.to_dict_upload(less_similar_car)
            less_similar_car_content["similarity"] = less[i][1]
            less_similar_car_content_list.append(less_similar_car_content)

        is_upload = False
        if data.gallery_id:
            is_upload = True

        result = {
            "ai_result_id": id,
            "most_car": {
                "similarity": data.similarity,
                "is_upload": is_upload,
                "most_car_url": data.most_similar_car_url,
                "most_car_detail": most_similar_car_content,
                "most_car_color": most_similar_car_color_content,
            },
            "less_cars": less_similar_car_content_list,
        }
    db.session.close()

    return result
