from models import Ai_Result, Car, CarColor, Gallary, db
from werkzeug.exceptions import abort


def get_detail(id):
    car = Car.query.filter(Car.id == id).first()
    car_color = CarColor.query.filter(CarColor.car_id == id).first()

    car_content = Car.to_dict(car)
    car_color = CarColor.to_dict(car_color)
    return car_content, car_color


def get_same_id_gallary_img(id, ai_result_id):
    limit_num = 9

    same_id_gallary = (
        Ai_Result.query.filter(
            Ai_Result.car_id == id,
            Ai_Result.gallary_id != None,
            Ai_Result.id != ai_result_id,
        )
        .order_by(Ai_Result.created_at.desc())
        .limit(limit_num)
    )

    car_name = Car.query.filter(Car.id == int(id)).first().name

    gallary_contents = list()
    gallary_contents.append({"result_num": same_id_gallary.count()})

    for car in same_id_gallary:
        gallary_data = Gallary.query.filter(Gallary.id == car.gallary_id).first()

        gallary_contents.append(
            {
                "car_id": car.car_id,
                "ai_gallary_contents_id": car.id,
                "similarity": car.similarity,
                "car_url": car.most_similar_car_url,
                "nickname": gallary_data.nickname,
            }
        )

    db.session.close()

    return {"car_name": car_name, "gallery_contents": gallary_contents}
