from models import Ai_Result, Car, CarColor, Gallery, db
from werkzeug.exceptions import abort


def get_detail(id):
    car = Car.query.filter(Car.id == id).first()
    car_color = CarColor.query.filter(CarColor.car_id == id).first()

    car_content = Car.to_dict(car)
    car_color = CarColor.to_dict(car_color)
    return car_content, car_color


def get_same_id_gallery_img(id, ai_result_id):
    limit_num = 9

    same_id_gallery = (
        Ai_Result.query.filter(
            Ai_Result.car_id == id,
            Ai_Result.gallery_id != None,
            Ai_Result.id != ai_result_id,
        )
        .order_by(Ai_Result.created_at.desc())
        .limit(limit_num)
    )

    car_name = Car.query.filter(Car.id == int(id)).first().name

    gallery_contents = list()
    gallery_contents.append({"result_num": same_id_gallery.count()})

    for car in same_id_gallery:
        gallery_data = Gallery.query.filter(Gallery.id == car.gallery_id).first()

        gallery_contents.append(
            {
                "car_id": car.car_id,
                "ai_gallery_contents_id": car.id,
                "similarity": car.similarity,
                "car_url": car.most_similar_car_url,
                "nickname": gallery_data.nickname,
            }
        )

    db.session.close()

    return {"car_name": car_name, "gallery_contents": gallery_contents}
