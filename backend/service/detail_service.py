from models.car import Car


def get_detail(id):
    car = Car.query.filter(Car.id == id).first()
    car_content = Car.to_dict(car)
    return car_content
