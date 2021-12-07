from db_connect import db
from flask import abort
from models import Car, Gallary
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
