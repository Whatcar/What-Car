from models import Car, CarColor


def get_detail(id):
    car = Car.query.filter(Car.id == id).first()
    car_color = CarColor.query.filter(CarColor.car_id == id).first()

    car_content = Car.to_dict(car)
    car_color = CarColor.to_dict(car_color)
    return car_content
