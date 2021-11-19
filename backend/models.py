from datetime import datetime

from db_connect import db


# 차 정보
class Car(db.Model):
    __tablename__ = "car"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    photolink = db.Column(db.Text, nullable=False, default="./static/image/default.png")
    brand = db.Column(db.String(30), nullable=False)
    imported_domestic = db.Column(db.String(30), nullable=False)
    price = db.Column(db.String(40), nullable=False)
    fuel_efficiency = db.Column(db.String(30), nullable=False)
    fuel = db.Column(db.String(30), nullable=False)
    car_grade = db.Column(db.String(30), nullable=False)
    appearance = db.Column(db.String(30), nullable=False)
    grade_name = db.Column(db.String(50), nullable=False)
    on_sale = db.Column(db.String(30), nullable=False)
    release_date = db.Column(db.Date, nullable=True)
    discontinued_date = db.Column(db.Date, nullable=True)
    ride_capacity = db.Column(db.String(30), nullable=False)
    top_speed = db.Column(db.String(30), nullable=False)
    displacement = db.Column(db.String(30), nullable=False)
    engine_type = db.Column(db.String(30), nullable=False)
    drive_method = db.Column(db.String(30), nullable=False)
    fuel_efficiency_rating = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "photolink": self.photolink,
            "brand": self.brand,
            "imported_domestic": self.imported_domestic,
            "price": self.price,
            "fuel_efficiency": self.fuel_efficiency,
            "fuel": self.fuel,
            "car_grade": self.car_grade,
            "appearance": self.appearance,
            "grade_name": self.grade_name,
            "on_sale": self.on_sale,
            "release_date": self.release_date,
            "discontinued_date": self.discontinued_date,
            "ride_capacity": self.ride_capacity,
            "top_speed": self.top_speed,
            "displacement": self.displacement,
            "engine_type": self.engine_type,
            "drive_method": self.drive_method,
            "fuel_efficiency_rating": self.fuel_efficiency_rating,
        }

    worldcups = db.relationship("Worldcup", backref="car", lazy=True)


# 월드컵
class Worldcup(db.Model):
    __tablename__ = "worldcup"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    car_id = db.Column(db.Integer, db.ForeignKey("car.id"))
    count = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {"car_id": self.car_id, "count": self.count}


# Mbti 질문 정보
class Mbti_question(db.Model):
    __tablename__ = "mbti_question"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    question = db.Column(db.String(255), nullable=False)
    weight = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {"question": self.question, "weight": self.weight}


# Mbti 결과 정보
class Mbti_result(db.Model):
    __tablename__ = "mbti_result"
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    type = db.Column(db.String(30), nullable=False, unique=True)

    def to_dict(self):
        return {"type": self.type}
