from config import aws_s3
from db_connect import db
from flask import abort
from models import Ai_Result, Car, Gallary
from s3_connection import s3_resource
from werkzeug.exceptions import HTTPException


def get_gallary_cars(off_set, limit_num):
    """
    1. offset에서 limit만큼 차를 가져온다.
    """
    try:
        data = Gallary.query.offset(off_set).limit(limit_num)
    except Exception as e:
        print(e)
        abort(404, "no data")
    result = list()
    for d in data:
        car_data = Car.query.filter_by(id=d.car_id).first()
        result.append(
            {
                "gallary_id": d.id,
                "car_name": car_data.name,
                "similarity": d.similarity,
                "car_url": d.car_url,
                "nickname": d.nickname,
            }
        )

    return {"result_num": len(result), "cars": result}


def post_gallary_cars(info):
    try:
        ai_db_id = info["ai_db_id"]
        car_id = info["car_id"]
        car_url = info["car_url"]
        similarity = info["similarity"]
        nickname = info["nickname"]
        pw = info["password"]

        # s3 bucket 영구저장
        s3 = s3_resource()

        ai_db = Ai_Result.query.filter_by(id=ai_db_id).first()

        # 파일 복사
        copy_key = "/".join(ai_db.most_similar_car_url.split("/")[3:])
        copy_image = {"Bucket": "whatcar", "Key": copy_key}
        src_folder = "upload"
        dst_folder = "gallary"
        new_key = copy_key.replace(src_folder, dst_folder)
        s3_bucket = s3.Bucket("whatcar")
        new_obj = s3_bucket.Object(new_key)
        new_obj.copy(copy_image)

        img_url = (
            f"https://{aws_s3['BUCKET_NAME']}.s3.ap-northeast-2.amazonaws.com/{new_key}"
        )
        # gallary db에 저장
        new_gallary = Gallary(
            car_id=car_id,
            car_url=img_url,
            similarity=similarity,
            nickname=nickname,
            password=pw,
        )
        db.session.add(new_gallary)

        # ai_result db에 업로드되었다고 수정
        ai_db.is_upload = True
        ai_db.most_similar_car_url = img_url
        db.session.add(ai_db)

        db.session.commit()

        return "Created"
    except Exception as e:
        print(e)
        db.session.rollback()
        abort(400, "Failed")


def delete_gallary_cars(info):
    try:
        gallary_id = info["gallary_id"]
        pw = info["password"]
        del_gallary = Gallary.query.filter_by(id=gallary_id).first()
        if del_gallary.is_password_correct(pw):
            db.session.delete(del_gallary)
            db.session.commit()
            return "Deleted"
        else:
            abort(409)
    except Exception as e:
        print(e)
        if isinstance(e, HTTPException):
            abort(e.code, "Not Correct PW")
        db.session.rollback()
        abort(400, "Failed")
