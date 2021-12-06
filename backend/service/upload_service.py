import datetime
import io
import os
import random
import time

import cv2
import numpy as np
import requests
from ai import detection, label, model
from config import aws_s3
from models import Car, Gallery, Temporary_Ai_Car, db
from PIL import Image
from s3_connection import s3_connection
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename


def pagination(query_list, num):

    query_data_num = query_list.count()
    print(query_data_num)
    per_page = 9
    range_start = per_page * (num - 1)
    total_page = query_data_num // per_page
    rest_data = query_data_num % per_page

    # # 검색 결과가 없으면
    if query_data_num == 0:
        car_list = []

    # per_page가 다 채워지지 않은 마지막 페이지를 넘으면
    elif num >= (total_page + 1) and rest_data == 0:
        abort(404, "페이지 범위를 초과했습니다.")

    # 전체 데이터 개수//페이지 당 데이터가 들어온 페이지 범위를 넘으면
    elif num > (total_page + 1):
        abort(404, "페이지 범위를 초과했습니다.")

    # 전체 데이터 개수//페이지 당 데이터가 들어온 페이지 같으면
    if num == (total_page + 1) and not rest_data == 0:
        # 범위 시작값부터 마지막 데이터까지
        query_list = query_list[range_start:query_data_num]
    else:
        query_list = query_list[range_start : per_page * num]

    car_list = [Gallery.to_dict(car) for car in query_list]

    result = {"result_num": query_data_num, "gallery_content": car_list}
    return result


def get_upload_result(data):
    if not data:
        abort(404, "파일이 존재하지 않습니다.")

    # read file
    nparr = np.fromfile(data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # detection car
    box_points = detection.predict(img)
    if box_points is None:
        print("상위 5개중에 차가 없습니다! 어떻게 할까요")
        return abort(409, "차가 존재하지 않습니다.")

    # predict car
    predict_value = model.predict(img, box_points)

    # similiar cars
    result = []
    for label_id, val in predict_value:
        car_id = label.label_dict[label_id]
        result.append((car_id, val))
    label_id = predict_value[0][0]
    print(label.label_dict[label_id], label_id, predict_value[0][1])
    print(result)
    # visualize car
    boxing_car = model.visualize(img, box_points)
    cv2.imwrite("result.jpg", img)

    img2 = Image.open("result.jpg")
    in_mem_file = io.BytesIO()
    img2.save(in_mem_file, format=img2.format)
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
    img_url = f"https://{aws_s3['BUCKET_NAME']}.s3.ap-northeast-2.amazonaws.com/upload/{now}{rand}result"
    most_similar_car = str([result[0][0], result[0][1]])
    less_similar_cars = str(
        [(result[i][0], result[i][1]) for i in range(1, len(result))]
    )
    print(most_similar_car, less_similar_cars, img_url)

    temp_data = Temporary_Ai_Car(
        most_similar_car=most_similar_car,
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
    id = (
        Temporary_Ai_Car.query.filter(Temporary_Ai_Car.most_similar_car_url == img_url)
        .first()
        .id
    )
    print(id)

    os.remove("result.jpg")
    return {"id": id}


def get_ai_cars_detail(id):
    data = Temporary_Ai_Car.query.filter(Temporary_Ai_Car.id == id).first()

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
    if response.status_code == 403:
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
        content = Temporary_Ai_Car.to_dict(data)

        most = content["most_similar_car"]
        less = content["less_similar_cars"]
        most_similar_car = Car.query.filter(Car.id == most[0]).first()
        less_similar_car_1 = Car.query.filter(Car.id == less[0][0]).first()
        less_similar_car_2 = Car.query.filter(Car.id == less[1][0]).first()
        less_similar_car_3 = Car.query.filter(Car.id == less[2][0]).first()
        less_similar_car_4 = Car.query.filter(Car.id == less[3][0]).first()
        most_similar_car_content = Car.to_dict(most_similar_car)
        less_similar_car_1_content = Car.to_dict_part(less_similar_car_1)
        less_similar_car_2_content = Car.to_dict_part(less_similar_car_2)
        less_similar_car_3_content = Car.to_dict_part(less_similar_car_3)
        less_similar_car_4_content = Car.to_dict_part(less_similar_car_4)
        result = {
            "most_car": {
                "most_car_db_id": id,
                "most_car_url": data.most_similar_car_url,
                "most_car_detail": most_similar_car_content,
            },
            "less_cars": {
                "less_car_1_detail": less_similar_car_1_content,
                "less_car_2_detail": less_similar_car_2_content,
                "less_car_3_detail": less_similar_car_3_content,
                "less_car_4_detail": less_similar_car_4_content,
            },
        }
    return result


def get_same_id_gallery_img(id, num):
    data = Temporary_Ai_Car.query.filter(Temporary_Ai_Car.id == id).first()

    content = Temporary_Ai_Car.to_dict(data)
    most = content["most_similar_car"]
    same_id_gallery = Gallery.query.filter(Gallery.car_id == most[0])
    # same_id_gallery2 = [Gallery.to_dict(content) for content in same_id_gallery]
    gallery_contents = pagination(same_id_gallery, num)
    # print(same_id_gallery2)
    return gallery_contents
