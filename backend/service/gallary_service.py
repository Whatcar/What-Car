from db_connect import db
from flask import abort
from models import Gallary
from werkzeug.exceptions import HTTPException


def get_gallary_cars():
    # 모든 차를 가져온다.
    data = Gallary.query.all()

    result = list()
    for d in data:
        result.append(
            {
                "gallary_id": d.id,
                "car_id": d.car_id,
                "similarity": d.similarity,
                "car_url": d.car_url,
                "nickname": d.nickname,
            }
        )

    return {"result_num": len(result), "cars": result}


def post_gallary_cars(info):
    try:
        car_id = info["car_id"]
        car_url = info["car_url"]
        similarity = info["similarity"]
        nickname = info["nickname"]
        pw = info["password"]

        new_gallary = Gallary(
            car_id=car_id,
            car_url=car_url,
            similarity=similarity,
            nickname=nickname,
            password=pw,
        )
        db.session.add(new_gallary)
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
