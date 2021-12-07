from db_connect import db
from models import Gallary


def get_gallary_cars(car_id):
    # 모든 차를 가져온다.
    if car_id is None:
        data = Gallary.query.all()
    else:
        # Todo : 무한스크롤 방식으로 조금씩 가져오기
        data = Gallary.query.filter_by(car_id=car_id).all()

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

    return {"result_num": len(result), "cars": result}, 200


def post_gallary_cars(info):
    try:
        boxing_car = info["boxing_car"]
        similarity = info["similarity"]
        car_id = info["car_id"]
        nickname = info["nickname"]
        pw = info["password"]

        new_gallary = Gallary(
            car_id=car_id,
            car_url=boxing_car,
            similarity=similarity,
            nickname=nickname,
            password=pw,
        )
        db.session.add(new_gallary)
        db.session.commit()
        return 201
    except Exception as e:
        print(e)
        db.session.rollback()
        return 400


def delete_gallary_cars(info):
    try:
        gallary_id = info["gallary_id"]
        pw = info["password"]
        del_gallary = Gallary.query.filter_by(id=gallary_id).first()
        if del_gallary.is_password_correct(pw):
            db.session.delete(del_gallary)
            db.session.commit()
        else:
            return 409
        return 204
    except Exception as e:
        print(e)
        db.session.rollback()
        return 400
