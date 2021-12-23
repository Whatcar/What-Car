from config import aws_s3
from flask import abort
from models import Ai_Result, Car, Gallery, db
from s3_connection import s3_resource
from werkzeug.exceptions import HTTPException


def get_gallery_cars(off_set, limit_num):
    """
    1. offset에서 limit만큼 차를 가져온다.
    """
    try:
        gallaries = (
            db.session.query(Gallery, Ai_Result, Car)
            .with_entities(
                Gallery.id.label("gallery_id"),
                Gallery.nickname,
                Ai_Result.id,
                Ai_Result.similarity,
                Ai_Result.most_similar_car_url,
                Car.name,
            )
            .filter(Gallery.id == Ai_Result.gallery_id)
            .filter(Ai_Result.car_id == Car.id)
            .order_by(Gallery.created_at.desc())
            .offset(off_set)
            .limit(limit_num)
        )
        db.session.close()
    except Exception as e:
        print(e)
        abort(404, "no data")
    result = list()
    for gallery_data in gallaries:
        result.append(
            {
                "gallery_id": gallery_data.gallery_id,
                "ai_result_id": gallery_data.id,
                "car_name": gallery_data.name,
                "similarity": gallery_data.similarity,
                "car_url": gallery_data.most_similar_car_url,
                "nickname": gallery_data.nickname,
            }
        )

    return {"result_num": len(result), "cars": result}


def post_gallery_cars(info):
    try:
        ai_result_id = info["ai_result_id"]
        nickname = info["nickname"]
        pw = info["password"]

        # gallery db에 저장
        new_gallery = Gallery(
            nickname=nickname,
            password=pw,
        )
        db.session.add(new_gallery)
        db.session.flush()

        # s3 bucket 영구저장
        s3 = s3_resource()

        ai_db = Ai_Result.query.filter_by(id=ai_result_id).first()

        # 파일 복사
        copy_key = "/".join(ai_db.most_similar_car_url.split("/")[3:])
        copy_image = {"Bucket": aws_s3["BUCKET_NAME"], "Key": copy_key}
        src_folder = "upload"
        dst_folder = "gallary"
        new_key = copy_key.replace(src_folder, dst_folder)
        s3_bucket = s3.Bucket(aws_s3["BUCKET_NAME"])
        new_obj = s3_bucket.Object(new_key)
        new_obj.copy(copy_image)
        img_url = f"https://{aws_s3['BUCKET_NAME']}.s3.{aws_s3['REGION']}.amazonaws.com/{new_key}"
        # ai_result db에 업로드되었다고 수정
        # ai_db객체를 수정하면 null값이 default로 되어있으면 직접 수정이 불가능
        db.session.query(Ai_Result).filter_by(id=ai_result_id).update(
            {"most_similar_car_url": img_url, "gallery_id": new_gallery.id}
        )

        db.session.commit()

        return "Created"
    except Exception as e:
        print(e)
        db.session.rollback()
        abort(400, "Failed")


def delete_gallery_cars(info):
    try:
        gallery_id = info["gallery_id"]
        pw = info["password"]
        del_gallery = Gallery.query.filter_by(id=gallery_id).first()
        if del_gallery.is_password_correct(pw):
            db.session.delete(del_gallery)
            db.session.commit()
            db.session.close()
            return "Deleted"
        else:
            abort(409)
    except Exception as e:
        print(e)
        if isinstance(e, HTTPException):
            abort(e.code, "Not Correct PW")
        db.session.rollback()
        abort(400, "Failed")
